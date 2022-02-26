// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

import {
    unpack_models as deserialize,
} from '@jupyter-widgets/base';

import { BoxModel } from '@jupyter-widgets/controls';

import { MODULE_NAME, MODULE_VERSION } from '../version';

import type Cesium from "cesium";
import { ICameraMessage } from '../types/camera_messages';
import { type CesiumContainer } from "./cesiumframe";


export class CZMLCartesian3Model extends BoxModel {
    static model_name = 'CZMLCartesian3Model';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = null; // Set to null if no view
    static view_module = null; // Set to null if no view
    static view_module_version = MODULE_VERSION;

    defaults() {
        return {
            ...super.defaults(),
            _model_name: CZMLCartesian3Model.model_name,
            _model_module: CZMLCartesian3Model.model_module,
            _model_module_version: CZMLCartesian3Model.model_module_version,
            _view_name: CZMLCartesian3Model.view_name,
            _view_module: CZMLCartesian3Model.view_module,
            _view_module_version: CZMLCartesian3Model.view_module_version,
        };
    }

    update(value: Cesium.Cartesian3){
        this.set("x", value.x);
        this.set("y", value.y);
        this.set("z", value.z);
        this.save_changes();
    }
}


export class CZMLCameraModel extends BoxModel {
    static model_name = 'CZMLCameraModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = null; // Set to null if no view
    static view_module = null; // Set to null if no view
    static view_module_version = MODULE_VERSION;

    _camera: Cesium.Camera;
    _lifecycle_events: Cesium.Event.RemoveCallback[];
    container: CesiumContainer;

    defaults() {
        return {
            ...super.defaults(),
            _model_name: CZMLCameraModel.model_name,
            _model_module: CZMLCameraModel.model_module,
            _model_module_version: CZMLCameraModel.model_module_version,
            _view_name: CZMLCameraModel.view_name,
            _view_module: CZMLCameraModel.view_module,
            _view_module_version: CZMLCameraModel.view_module_version,
        };
    }

    static serializers = {
        ...BoxModel.serializers,
        position: { deserialize },
        direction: { deserialize },
    };

    initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any; }): void {
        super.initialize(attributes, options);
        this.on("msg:custom", this.command, this);
    }

    get position(): CZMLCartesian3Model {
        return this.get("position")
    }

    get direction(): CZMLCartesian3Model {
        return this.get("direction")
    }

    set camera(camera: Cesium.Camera) {
        if (this._camera){
            // TODO call Remove callbacks, until then...
            throw new Error("Camera already set");
        }
        this._camera = camera;
        this._lifecycle_events = [
            this._camera.moveStart.addEventListener(this.handleMoveStart, this),
            this._camera.moveEnd.addEventListener(this.handleMoveEnd, this),
            this._camera.changed.addEventListener(this.handleChanged, this),
        ]
    }

    get camera(): Cesium.Camera {
        return this._camera
    }

    set_viewer(container: CesiumContainer) {
        this.container = container;
        this.camera = container.viewer.camera;
      }

    handleMoveStart(){
        this.handleMove();
    }

    handleMoveEnd(){
        this.handleMove();
    }

    handleChanged(){
        this.handleMove();
    }

    handleMove(){
        this.position.update(this._camera.position)
        this.direction.update(this._camera.direction)
        this.send({
            event: "move",
            position: this._camera.position,
            direction: this._camera.direction,
        }, {}, [])
    }

    command(content: ICameraMessage){
        switch (content.action) {
            case "flyTo":
                this._camera.flyTo(content.options);
                break
        }
    }
}