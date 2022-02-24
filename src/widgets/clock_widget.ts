// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

import {
  unpack_models as deserialize,
} from '@jupyter-widgets/base';

import { BoxModel } from '@jupyter-widgets/controls';

import { MODULE_NAME, MODULE_VERSION } from '../version';

import { Clock } from "cesium";

import { IPyViewer } from './viewer';
import JulianDate from 'cesium/Source/Core/JulianDate';



export class CZMLClockModel extends BoxModel {
  static model_name = 'CZMLClockModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = null; // Set to null if no view
  static view_module = null; // Set to null if no view
  static view_module_version = MODULE_VERSION;

  _clock: Clock;
  viewer: IPyViewer;

  private _currentTime: JulianDate

  defaults() {
    return {
      ...super.defaults(),
      _model_name: CZMLClockModel.model_name,
      _model_module: CZMLClockModel.model_module,
      _model_module_version: CZMLClockModel.model_module_version,
      _view_name: CZMLClockModel.view_name,
      _view_module: CZMLClockModel.view_module,
      _view_module_version: CZMLClockModel.view_module_version,
    };
  }

  initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any; }): void {
    super.initialize(attributes, options);
    this.on('change:current_time', this.set_cesium_current_time, this);
  };

  static serializers = {
    ...BoxModel.serializers,
    start_time: { deserialize },
    stop_time: { deserialize },
    current_time: { deserialize },
    multiplier: { deserialize },
  };

  set clock(clock: Clock) {
    if (this._clock){
      throw new Error("Clock already set");
    }
    this._clock = clock;
    this._clock.onTick.addEventListener(this.update, this);
  }

  get clock(): Clock {
    return this._clock
  }

  set_viewer(viewer: IPyViewer) {
    this.viewer = viewer;
    this.clock = viewer.clock;
  }

  update(): void {
    if (this._clock && !this._clock.currentTime.equals(this._currentTime)) {
      this._currentTime = this._clock.currentTime;
      this.set("start_time", this.toIso8601(this._clock.startTime));
      this.set("stop_time", this.toIso8601(this._clock.stopTime));
      this.set("current_time", this.toIso8601(this._clock.currentTime));
      this.save_changes();
    }

  }

  toIso8601(time: JulianDate): string {
    let toIso8601 = this.viewer.Cesium.JulianDate.toIso8601;
    // JulianDate
    console.log("convert time");
    let rep = toIso8601(time);
    let matches = rep.match(/(?<prefix>.*)\.(?<millis>.*)Z/);
    if (matches) {
      let [_, prefix, millis] = matches;
      rep = prefix + "." + millis.substring(0, 6) + "Z";
    }
    return rep;

  }

  set_cesium_current_time(): void {
    let fromIso8601 = this.viewer.Cesium.JulianDate.fromIso8601;
    console.log("set cesium time");
    this.clock.currentTime = fromIso8601(this.get("current_time"));
  }

}