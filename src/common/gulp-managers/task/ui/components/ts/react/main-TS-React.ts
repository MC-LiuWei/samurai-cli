/*
 * @Author: 刘伟
 * @Date: 2020-07-05 10:19:58
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-14 23:36:17
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/task/ui/components/ts/react/main-TS-React.ts
 */
import { src, dest } from "gulp";
import { createWriteStream, writeFileSync } from "fs";
import { join, basename } from "path";
import { obj } from "through2";
import { renderString } from "nunjucks";
import rename from "gulp-rename";
import { comMainTemplateTsReact } from "./componenTsTemplate-TS-React";
import { Buffer } from "buffer";
import { ICmdUiOptions } from "../../../../../gulps";
import {
  findTempDirectory,
  findDirectory,
  Directory,
} from "../../../../../../../utils";

/**
 * @description 文档组件入口文件加载
 * @author liu wei
 * @date 2020-07-13
 * @export
 * @param {ICmdUiOptions} options
 */
export function conComMainTsReact(options: ICmdUiOptions) {
  const { components, rootPath, temp } = options;
  const tempPath = findTempDirectory(rootPath, temp),
    componentsDocsPath = join(tempPath, components);
  const dirs = findDirectory(componentsDocsPath, Directory.DIRECTORY);
  const streams = dirs.map((dir) => {
    const dirName = basename(dir);
    return src(join(dir, "data.ts"))
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const code = renderString(comMainTemplateTsReact, {
            data: `./${filename}`,
            name: dirName,
            connect: "cs",
          });
          clone.contents = Buffer.from(code);
          this.push(clone);
          callback();
        })
      )
      .pipe(rename("index.tsx"))
      .pipe(dest(dir));
  });
}
