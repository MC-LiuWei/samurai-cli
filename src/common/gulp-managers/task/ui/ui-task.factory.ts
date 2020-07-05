/*
 * @Author: 刘伟
 * @Date: 2020-07-04 18:40:47
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-05 01:02:17
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/task/ui/ui-task.factory.ts
 */
import { ParsedArgs } from "minimist";
import { comComTsReact } from "./components";
import { Language, Library } from ".";
import { ICmdUiOptions } from "../../gulps";

function UiTaskTs(args: ICmdUiOptions) {
  const { library } = args;
  switch (library) {
    case Library.REACT:
      return comComTsReact(args);
      break;
    default:
      break;
  }
}

export function UiTaskMain(args: ICmdUiOptions) {
  const { language } = args;
  switch (language) {
    case Language.TS:
      return UiTaskTs(args);
      break;
    default:
      break;
  }
}
