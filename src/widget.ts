// Copyright (c) czml3 contributors
// Distributed under the terms of the Modified BSD License.

import {
  unpack_models as deserialize,
  WidgetView,
} from '@jupyter-widgets/base';

import { IFrame, } from '@jupyterlab/apputils';

import { PageConfig, URLExt } from '@jupyterlab/coreutils';

import { BoxModel, BoxView } from '@jupyter-widgets/controls';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../css/widget.css';

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

export class CZMLModel extends BoxModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: CZMLModel.model_name,
      _model_module: CZMLModel.model_module,
      _model_module_version: CZMLModel.model_module_version,
      _view_name: CZMLModel.view_name,
      _view_module: CZMLModel.view_module,
      _view_module_version: CZMLModel.view_module_version,
    };
  }

  static serializers = { ...BoxModel.serializers, source: { deserialize } };


  static model_name = 'CZMLModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'CZMLView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class CZMLView extends BoxView {
  protected frame: IFrame;

  initialize(parameters: WidgetView.InitializeParameters<CZMLModel>): void {
    super.initialize(parameters);
    this.frame = new IFrame({ sandbox: SANDBOX_EXCEPTIONS });
    this.frame.url = INDEX_URL;
    this.pWidget.addWidget(this.frame);
  }

  render() {
    this.model.on('change:document', this.documentChanged, this);
  }

  documentChanged() {
    const doc = this.model.get('document');
    console.log(doc, this.frame);
  }
}
