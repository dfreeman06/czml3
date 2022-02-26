// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

import {
    unpack_models as deserialize,
    WidgetModel,
} from '@jupyter-widgets/base';
import { UUID } from "@lumino/coreutils";


import { MODULE_NAME, MODULE_VERSION } from '../version';

import { Entity, EntityCollection, Event } from "cesium";
import { create_model_czml } from "./widget_utilities";
import type Cesium from "cesium";


export class CZMLEntityModel extends WidgetModel {
    static model_name = 'CZMLEntityModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name =  "CZMLEntityView";
    static view_module= MODULE_NAME
    static view_module_version = MODULE_VERSION

    _entity: Entity;
    viewer: Cesium.Viewer;
    _lifecycle_events: Event.RemoveCallback[];

    defaults() {
        return {
            ...super.defaults(),
            _model_name: CZMLEntityModel.model_name,
            _model_module: CZMLEntityModel.model_module,
            _model_module_version: CZMLEntityModel.model_module_version,
            _view_name: CZMLEntityModel.view_name,
            _view_module: CZMLEntityModel.view_module,
            _view_module_version: CZMLEntityModel.view_module_version,
        };
    }

    initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any; }): void {
        super.initialize(attributes, options);
        this.on("msg:custom", this.command, this);
    }

    set_viewer(viewer: Cesium.Viewer){
        this.viewer = viewer
    }

    command(content: any){  //TODO make messages for loading
        switch (content.action) {
            case "load":

                break
        }
    }

    setEntity(entity: Entity){
        this._entity = entity;
    }

}

export class CZMLEntityCollectionModel extends WidgetModel {
    static model_name = 'CZMLEntityCollectionModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name =  null
    static view_module= MODULE_NAME
    static view_module_version = MODULE_VERSION

    _entity_collection: EntityCollection;
    viewer: Cesium.Viewer;
    _lifecycle_events: Event.RemoveCallback[];

    defaults() {
        return {
            ...super.defaults(),
            _model_name: CZMLEntityCollectionModel.model_name,
            _model_module: CZMLEntityCollectionModel.model_module,
            _model_module_version: CZMLEntityCollectionModel.model_module_version,
            // _view_name: CZMLEntityCollectionModel.view_name,
            _view_module: CZMLEntityCollectionModel.view_module,
            _view_module_version: CZMLEntityCollectionModel.view_module_version,
        };
    }

    static serializers:any = {
        values: { deserialize },
    };

    initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any; }): void {
        super.initialize(attributes, options);
        this.on("msg:custom", this.command, this);
    }

    set_viewer(viewer: Cesium.Viewer){
        this.viewer = viewer
    }

    command(content: any){  //TODO make messages for loading
        switch (content.action) {
            case "add":
                break
            case "remove":
                break
        }
    }

    create_entity = async (entity: Entity): Promise<CZMLEntityModel> => {
        let id = UUID.uuid4();
        let model_promise = create_model_czml<CZMLEntityModel>(
            this.widget_manager,
            "CZMLEntity",
            id,
            {
                id: entity.id,
            }
        )
        this.widget_manager.register_model(id, model_promise)
        // model.setEntity(entity);
        // model.save_changes();
        // model.save();
        let model = await model_promise;
        return model
    }

    async register(collection: EntityCollection): Promise<void>{
        // return
        let manager = this.widget_manager;
        console.log("start registering...", manager);
        let entities: CZMLEntityModel[] = [];

        this._entity_collection = collection;

        entities = await Promise.all(collection.values.map(this.create_entity));
        this.set("values", entities)
        console.log("registering entities", entities);
        setTimeout(() => {
            console.log("pause");
            this.save_changes();
        }, 1000);

    }

}

