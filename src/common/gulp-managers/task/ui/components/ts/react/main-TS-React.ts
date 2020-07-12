/*
 * @Author: 刘伟
 * @Date: 2020-07-05 10:19:58
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-13 07:20:12
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/task/ui/components/ts/react/main-TS-React.ts
 */
import { src } from "gulp";
import { join, basename } from "path";
import { ICmdUiOptions } from "../../../../../gulps";
import {
  findTempDirectory,
  findDirectory,
  Directory,
} from "../../../../../../../utils";
import { obj } from "through2";

/**
 * @description 文档组件入口文件加载
 * @author liu wei
 * @date 2020-07-13
 * @export
 * @param {ICmdUiOptions} options
 */
export function conComMainTsReact(options: ICmdUiOptions) {
  const { components, rootPath, temp, demo } = options;
  const tempPath = findTempDirectory(rootPath, temp),
    componentsDocsPath = join(tempPath, components);
  const dirs = findDirectory(componentsDocsPath, Directory.DIRECTORY);
  const streams = dirs.map((dir) => {
    const dirName = basename(dir);
    return src(join(dir, "index.ts")).pipe(
      obj(function (file, _, callback) {
        console.log("文件流");
      })
    );
  });
}
