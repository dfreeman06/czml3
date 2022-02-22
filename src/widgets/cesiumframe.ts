// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.



import { IFrame, } from '@jupyterlab/apputils';

import { PageConfig, URLExt } from '@jupyterlab/coreutils';
import * as Cesium from "cesium";
import { IPyViewer } from './viewer';

// import { Message } from '@lumino/messaging';


/**
 * The path on the server to base application HTML, to be served in an iframe
 */
const INDEX_URL = URLExt.join(
    PageConfig.getOption("fullLabextensionsUrl"),
    '@poliastro/czml3/static/cesium/index.html'
);

/**
 * Additional capabilities to allow to sandbox
 */
const SANDBOX_EXCEPTIONS: IFrame.SandboxExceptions[] = [
    'allow-downloads',
    'allow-forms',
    'allow-modals',
    'allow-orientation-lock',
    'allow-pointer-lock',
    'allow-popups',
    'allow-presentation',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation',
];


export class CesiumFrame extends IFrame {
    private _frame: HTMLIFrameElement;
    viewer: IPyViewer;
    ready: Promise<void>;
    ready_resolver: CallableFunction | null;

    constructor() {
    super({ sandbox: SANDBOX_EXCEPTIONS });
        this.url = INDEX_URL
        // this.addClass(CESIUM_CLASS);
        this.ready = new Promise((resolve, reject) => {
            this.ready_resolver = () => {
                resolve();
                this.ready_resolver = null;
            };
        });

    }

    load(options: Cesium.Viewer.ConstructorOptions): void {
        console.log("after show");
        if (this._frame?.contentWindow == null) {
            this._frame = this.node.querySelector('iframe') as HTMLIFrameElement;
            if (this._frame != null) {
                this._frame.onload = () => {
                    // grabbing viewer and cesium from iframe window
                    (<any>this._frame.contentWindow).start_cesium(options).then(
                        (viewer: IPyViewer) => {
                            this.initialize(viewer)
                        }
                    )
                }
            }
        }
    }

    // Initialization function after cesium viewer is ready
    initialize(viewer: IPyViewer) {
        console.log("frame init");
        this.viewer = viewer;
        let Cesium = viewer.Cesium;
        // TODO debugging
        (<any>window).Cesium = Cesium;
        (<any>window).viewer = this.viewer;
        if (this.ready_resolver) {
            console.log("frame resolved");
            this.ready_resolver(this.viewer)
        }
    }

    setDataSource(doc: Cesium.Entity): void {
        this.viewer.dataSources.removeAll();
        this.viewer.dataSources.add(this.viewer.Cesium.CzmlDataSource.load(doc))
    }
}


