// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

import {
    unpack_models as deserialize,
} from '@jupyter-widgets/base';

import { BoxModel } from '@jupyter-widgets/controls';

import { MODULE_NAME, MODULE_VERSION } from '../version';

import { Camera } from "cesium";
import { IPyViewer } from './viewer';

export class CZMLPositionModel extends BoxModel {
    static model_name = 'CZMLPositionModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = null; // Set to null if no view
    static view_module = null; // Set to null if no view
    static view_module_version = MODULE_VERSION;

    defaults() {
        return {
            ...super.defaults(),
            _model_name: CZMLPositionModel.model_name,
            _model_module: CZMLPositionModel.model_module,
            _model_module_version: CZMLPositionModel.model_module_version,
            _view_name: CZMLPositionModel.view_name,
            _view_module: CZMLPositionModel.view_module,
            _view_module_version: CZMLPositionModel.view_module_version,
        };
    }

    static serializers = {
        ...BoxModel.serializers,
        x: { deserialize },
        y: { deserialize },
        z: { deserialize },
    };
}


export class CZMLDirectionModel extends BoxModel {
    static model_name = 'CZMLDirectionModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = null; // Set to null if no view
    static view_module = null; // Set to null if no view
    static view_module_version = MODULE_VERSION;

    defaults() {
        return {
            ...super.defaults(),
            _model_name: CZMLDirectionModel.model_name,
            _model_module: CZMLDirectionModel.model_module,
            _model_module_version: CZMLDirectionModel.model_module_version,
            _view_name: CZMLDirectionModel.view_name,
            _view_module: CZMLDirectionModel.view_module,
            _view_module_version: CZMLDirectionModel.view_module_version,
        };
    }

    static serializers = {
        ...BoxModel.serializers,
        x: { deserialize },
        y: { deserialize },
        z: { deserialize },
    };
}

export class CZMLCameraModel extends BoxModel {
    static model_name = 'CZMLCameraModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = null; // Set to null if no view
    static view_module = null; // Set to null if no view
    static view_module_version = MODULE_VERSION;

    _camera: Camera;
    viewer: IPyViewer;

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
        start_time: { deserialize },
        end_time: { deserialize },
        current_time: { deserialize },
        multiplier: { deserialize },
    };

    set camera(camera: Camera) {
        this._camera = camera;
    }

    get camera(): Camera {
        return this._camera
    }

    set_viewer(viewer: IPyViewer){
        this.viewer = viewer;
        this.camera = viewer.camera;
    }
}