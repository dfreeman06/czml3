// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

import {
  unpack_models as deserialize,
  WidgetView,
} from '@jupyter-widgets/base';



import { BoxModel, BoxView } from '@jupyter-widgets/controls';

import { MODULE_NAME, MODULE_VERSION } from '../version';
// Import the CSS
import '../../css/widget.css';
// import { CesiumFrame } from './cesiumframe';
import type { CesiumContainer } from './cesiumframe';
import { CZMLClockModel } from './clock_widget';
import { CZMLCameraModel } from './camera_widget';
import { CZMLDataSourceModel } from './datasource_widget';
import type Cesium from "cesium";
import DataSource from 'cesium/Source/DataSources/DataSource';
import { GetCesium } from "./load_cesium";


export class CZMLModel extends BoxModel {
  static model_name = 'CZMLModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'CZMLView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;

  defaults() {
    return {
      ...super.defaults(),
      _model_name: CZMLModel.model_name,
      _model_module: CZMLModel.model_module,
      _model_module_version: CZMLModel.model_module_version,
      _view_name: CZMLModel.view_name,
      _view_module: CZMLModel.view_module,
      _view_module_version: CZMLModel.view_module_version,
    };
  }

  static serializers = {
    ...BoxModel.serializers,
    clock: { deserialize },
    camera: { deserialize },
    datasources: { deserialize },
  };

  initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any; }): void {
    super.initialize(attributes, options);
    this.on("change:ion_token", this.updateToken, this);
    this.updateToken();
  }

  get clock(): CZMLClockModel {
    return this.get('clock');
  }

  get camera(): CZMLCameraModel {
    return this.get('camera');
  }

  get options(): Cesium.Viewer.ConstructorOptions {
    return this.get("options");
  }

  get datasources(): CZMLDataSourceModel[] {
    return this.get("datasources")
  }

  async updateToken(): Promise<void> {
    let token: string = this.get("ion_token");
    if (token) {
      let cesium = await GetCesium;
      cesium.Ion.defaultAccessToken = token;
    }

  }

}

export class CZMLView extends BoxView {
  protected czml: CesiumContainer;
  model: CZMLModel;

  initialize(parameters: WidgetView.InitializeParameters<CZMLModel>): void {
    super.initialize(parameters);

    this.make_cesium().catch(console.warn);

  }

  async make_cesium() {
    const { CesiumContainer } = await import("./cesiumframe");
    this.czml = new CesiumContainer();
    this.czml.options = this.model.options;
    this.pWidget.addWidget(this.czml);
    (<any>window).czmlwidget = this;

    this.czml.ready.then((viewer) => {
      // Set inital data sources
      if (this.model.datasources) {
        this.updateDatasources();
      }
      // Set inital data sources
      this.model.clock.set_viewer(this.czml);
      this.model.camera.set_viewer(this.czml);
    })
  }

  render() {
    this.model.on("change:datasources", this.updateDatasources, this)
  }

  updateDatasources() {
    let newValue = this.model.get("datasources");
    let oldValue = this.model.previous("datasources");
    if (isEmpty(oldValue)) {
      oldValue = [];
    }

    // calculate entering and exiting datasources
    let entering: CZMLDataSourceModel[] = newValue.filter((x: DataSource) => !oldValue.includes(x));
    let exiting: CZMLDataSourceModel[] = oldValue.filter((x: DataSource) => !newValue.includes(x));

    for (let ds of entering) {
      this.czml.addDataSource(ds);
    }
    for (let ds of exiting) {
      this.czml.removeDataSource(ds);
    }
  }
}

function isEmpty(obj: any): boolean {
  if (!obj) {
    return true
  }
  return Object.keys(obj).length === 0;
}