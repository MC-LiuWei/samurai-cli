/*
 * @Author: 刘伟
 * @Date: 2020-06-27 16:45:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-27 16:58:23
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/webpack/index.ts
 */

import reactWebpack from "./react";
import { UiLibrary } from "../../../../options/enums";

const mapWebpackConfig = {
  react: reactWebpack,
};

export default function WebpackConfigFactory(library: UiLibrary) {
  switch (library) {
    case UiLibrary.REACT:
      return mapWebpackConfig[library];
      break;

    default:
      return mapWebpackConfig["react"];
      break;
  }
}
