/*
 * @Author: 刘伟
 * @Date: 2020-06-27 17:55:40
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-27 17:57:48
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/router/index.ts
 */
import routerReact from "./react";
import { UiLibrary } from "../../../../options/enums";

const mapRouterFunc = {
  react: routerReact,
};

export default function RouterFactory(library: UiLibrary) {
  switch (library) {
    case UiLibrary.REACT:
      return mapRouterFunc[library];
      break;

    default:
      return mapRouterFunc["react"];
      break;
  }
}
