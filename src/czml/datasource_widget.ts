// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

import {
    unpack_models as deserialize,
} from '@jupyter-widgets/base';

import { BoxModel } from '@jupyter-widgets/controls';

import { MODULE_NAME, MODULE_VERSION } from '../version';

import { DataSource } from "cesium";
import type Cesium from "cesium";
// TODO this is making Cesium Concrete
// import * as Cesium from "cesium";
import { CZMLEntityCollectionModel } from '.';
import { GetCesium } from './load_cesium';


// import CzmlDataSource from 'cesium/Source/DataSources/CzmlDataSource';

export class CZMLDataSourceModel extends BoxModel {
    static model_name = 'CZMLDataSourceModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = null; // Set to null if no view
    static view_module = null; // Set to null if no view
    static view_module_version = MODULE_VERSION;

    source: DataSource;
    viewer: Cesium.Viewer;

    defaults() {
        return {
            ...super.defaults(),
            _model_name: CZMLDataSourceModel.model_name,
            _model_module: CZMLDataSourceModel.model_module,
            _model_module_version: CZMLDataSourceModel.model_module_version,
            _view_name: CZMLDataSourceModel.view_name,
            _view_module: CZMLDataSourceModel.view_module,
            _view_module_version: CZMLDataSourceModel.view_module_version,
        };
    }

    static serializers = {
        ...BoxModel.serializers,
        name: { deserialize },
        entities: { deserialize },
        // show: { deserialize },
    };

    initialize(attributes: any, options: { model_id: string; comm?: any; widget_manager: any; }): void {
        super.initialize(attributes, options);
        this.on("msg:custom", this.command, this);
    }

    get entities():CZMLEntityCollectionModel{
        return this.get("entities")
    }

    command(content: any){  //TODO make messages for loading
        switch (content.action) {
            case "load":

                break
        }
    }

    setDataSource(datasource:DataSource) {
        console.log("CZML Set data source", datasource);
        this.source = datasource;
        // TODO create CZMLEntityWidgets for each entity in the collection
        this.entities.register(datasource.entities);


        console.log(this.source);
    }
}

export class CZMLCzmlDataSourceModel extends CZMLDataSourceModel {
    static model_name = 'CZMLCzmlDataSourceModel';
    static model_module = MODULE_NAME;
    static model_module_version = MODULE_VERSION;
    static view_name = null; // Set to null if no view
    static view_module = null; // Set to null if no view
    static view_module_version = MODULE_VERSION;

    defaults() {
        return {
            ...super.defaults(),
            _model_name: CZMLCzmlDataSourceModel.model_name,
            _model_module: CZMLCzmlDataSourceModel.model_module,
            _model_module_version: CZMLCzmlDataSourceModel.model_module_version,
            _view_name: CZMLCzmlDataSourceModel.view_name,
            _view_module: CZMLCzmlDataSourceModel.view_module,
            _view_module_version: CZMLCzmlDataSourceModel.view_module_version,
        };
    }

    command(content: any){  //TODO make messages for loading
        switch (content.action) {
            case "load":
                console.log("CZML Loading...", content);
                this.load(content.czml, content?.options);
                break
        }
    }

    async load(czml:any, options:any){
        let cesium = await GetCesium;
        console.log("cesium loaded");
        cesium.CzmlDataSource.load(czml, options).then((source:DataSource)=>this.setDataSource(source));
    }
}