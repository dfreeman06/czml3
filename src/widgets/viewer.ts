import * as Cesium from "cesium";

// TODO avoid reimplementing the IPyViewer created in the `copy_assets.py`
export interface IPyViewer extends Cesium.Viewer {
    ready: Promise<IPyViewer>;
    Cesium: typeof Cesium;  // keep a handle to the Cesium namespace
}
