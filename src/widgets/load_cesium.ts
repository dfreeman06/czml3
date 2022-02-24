// TODO think through best way to interact with Cesium Library
// currently the iframe loads the library and passes it back to
// main window. Could tweak webpack to load the library and pass
// into the iframe. Or rework the message passing to the iframe to
// avoid needing access to the Cesium objects directly.
import * as Cesium from "cesium";

export var SetCesium: CallableFunction;

export var GetCesium: Promise<typeof Cesium> = new Promise((_resolve, _reject) => {
    SetCesium = _resolve;
})