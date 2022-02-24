import { MODULE_NAME } from '../version';
import { ManagerBase, WidgetModel } from "@jupyter-widgets/base";


export async function create_model_czml<T extends WidgetModel>(
    manager: ManagerBase<any>,
    name: string,
    id: string,
    args: Object
  ) {
    return create_model<T>(manager, MODULE_NAME, `${name}Model`, `${name}View`, id, args);
  }


export async function create_model<T extends WidgetModel>(
    manager: ManagerBase<any>,
    module_name: string,
    model: string,
    view: string,
    id: string,
    args = {}
  ) {
    const model_widget = await manager.new_widget(
      {
        model_module: module_name,
        model_name: model,
        model_module_version: '*',
        view_module: module_name,
        view_name: view,
        view_module_version: '*',
        model_id: id,
      },
      args
    );
    return model_widget as T;
  }