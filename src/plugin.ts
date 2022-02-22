// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

import { Application, IPlugin } from '@phosphor/application';

import { Widget } from '@phosphor/widgets';

import { ExportMap, IJupyterWidgetRegistry } from '@jupyter-widgets/base';

import { MODULE_NAME, MODULE_VERSION } from './version';

const EXTENSION_ID = '@poliastro/czml3:plugin';
const DEBUG = false;

/**
 * The example plugin.
 */
const examplePlugin: IPlugin<Application<Widget>, void> = {
  id: EXTENSION_ID,
  requires: [IJupyterWidgetRegistry],
  activate: activateWidgetExtension,
  autoStart: true,
} as unknown as IPlugin<Application<Widget>, void>;

export default examplePlugin;

/**
 * Activate the widget extension.
 */
function activateWidgetExtension(
  app: Application<Widget>,
  registry: IJupyterWidgetRegistry
): void {
  if (DEBUG) {
    import('./_static').catch(console.warn);
  }
  registry.registerWidget({
    name: MODULE_NAME,
    version: MODULE_VERSION,
    exports: async () => {
      const { CZMLModel, CZMLView, CZMLClockModel, CZMLCameraModel, CZMLDirectionModel, CZMLPositionModel } = await import('./widgets');
      return { CZMLModel, CZMLView, CZMLClockModel, CZMLCameraModel, CZMLDirectionModel, CZMLPositionModel } as ExportMap;
    }
  });
}
