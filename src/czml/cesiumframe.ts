// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

// import * as Cesium from "cesium";
import { CZMLDataSourceModel } from '.';
// import { Message } from '@lumino/messaging';
import * as Cesium from "cesium";
import { Widget } from "@lumino/widgets";
import { Message } from '@lumino/messaging';
import { PageConfig, URLExt } from "@jupyterlab/coreutils";
import { MODULE_NAME} from "../version";
import { SetCesium } from "./load_cesium";


let NEXTID = 0
const CESIUM_BASE_URL = URLExt.join(PageConfig.getOption("fullLabextensionsUrl"), MODULE_NAME, "static");
(<any>window).CESIUM_BASE_URL = CESIUM_BASE_URL;

SetCesium(Cesium);

export class CesiumContainer extends Widget {
    viewer: Cesium.Viewer;
    ready: Promise<CesiumContainer>;
    ready_resolver: CallableFunction | null;
    Cesium: typeof Cesium;
    options: Cesium.Viewer.ConstructorOptions;

    constructor() {
        super({});

        this.id = `jp-cesium-${NEXTID++}`;


        this.Cesium = Cesium;
        this.ready = new Promise((resolve, reject)=>{
            this.ready_resolver = ()=> {
                resolve(this);
                this.ready_resolver = null;
            };
        });

    }

    static async addCSS(){
        let styleID = "jp-cesium-style";

        if (!document.getElementById(styleID)){
            let link = document.createElement("link");
            link.id = styleID;
            link.rel = "stylesheet"
            link.href = URLExt.join(CESIUM_BASE_URL, "Widgets/widgets.css");

            document.querySelector("head")!.appendChild(link)
            // TODO better wait for css to get parsed before finishing
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    async start_cesium(options: any) {
        await CesiumContainer.addCSS();
        this.viewer = new Cesium.Viewer(this.id, {
            ...options,
            terrainProvider: Cesium.createWorldTerrain()
        });
        // TODO after some manual testing seemed like two `flyTo` was more
        // stable. Improvements?
        await this.viewer.flyTo([]);
        await this.viewer.flyTo([]);
        if (this.ready_resolver){
            this.ready_resolver();
        }
    }
    protected onBeforeAttach(msg: Message): void {
        this.node.style.display = "flex";
        this.node.style.flexGrow = "1";
    }
    protected onAfterAttach(msg: Message): void {
        this.start_cesium(this.options)
    }

    addDataSource(datasource: CZMLDataSourceModel) {
        this.viewer.dataSources.add(datasource.source);
    }
    removeDataSource(datasource: CZMLDataSourceModel) {
        this.viewer.dataSources.remove(datasource.source);
    }
}

