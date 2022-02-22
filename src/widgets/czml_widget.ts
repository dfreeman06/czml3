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
import { CesiumFrame } from './cesiumframe';
import { CZMLClockModel } from './clock_widget';
import { CZMLCameraModel } from './camera_widget';
import * as Cesium from "cesium";


export class CZMLModel extends BoxModel {
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
    document: { deserialize },
    clock: {deserialize},
    camera: {deserialize},
    options: {deserialize},
  };

  get clock(): CZMLClockModel {
    return this.get('clock');
  }

  get camera(): CZMLCameraModel {
    return this.get('camera');
  }

  get options(): Cesium.Viewer.ConstructorOptions {
    return this.get("options");
  }


  get document(): Cesium.Entity {
    return this.get("document")
  }

  static model_name = 'CZMLModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'CZMLView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class CZMLView extends BoxView {
  protected czml: CesiumFrame;
  model: CZMLModel;

  initialize(parameters: WidgetView.InitializeParameters<CZMLModel>): void {
    super.initialize(parameters);
    this.czml = new CesiumFrame();

    this.pWidget.addWidget(this.czml);
    (<any>window).czmlwidget = this;
    this.displayed.then(() => {
      this.czml.load(this.model.options)
    });

    this.czml.ready.then((viewer)=>{
      // this.camera
      if (this.model.document){
        this.czml.setDataSource(this.model.document);
      }
      console.log("grab camera and clock objects", this.czml.viewer.camera);
      console.log("model clock", this.model.clock);
      this.model.clock.set_viewer(this.czml.viewer);
      this.model.camera.camera = this.czml.viewer.camera;
    })

  }

  render() {
    this.model.on('change:document', this.documentChanged, this);
  }

  documentChanged() {
    this.czml.setDataSource(this.model.document);
  }
}
