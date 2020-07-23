/*
 * @Author: 刘伟
 * @Date: 2020-07-15 21:27:49
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-15 23:27:37
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/task/ui/docs/ts/conDocs-TS.ts
 */

import { dest, src } from "gulp";
import { basename, join } from "path";
import { obj } from "through2";
import { Buffer } from "buffer";
import { renderString } from "nunjucks";
import { uniq } from "lodash";
import rename from "gulp-rename";
import mergeStream from "gulp-merge";
import concat from "gulp-concat";
import MT from "mark-twain";
import {
  Directory,
  findDirectory,
  findTempDirectory,
  ClassName,
} from "../../../../../../utils";
import { ICmdUiOptions } from "../../../../gulps";
import { comDocsTemplateTs } from "./comDocsTemplate-TS";

/**
 * 文档界面生成器
 *
 * @export
 * @param {ICmdUiOptions} options
 * @returns
 */
export function conDocsTs(options: ICmdUiOptions) {
  const { rootPath, docs, temp } = options;
  const tempPath = findTempDirectory(rootPath, temp),
    docsPath = join(rootPath, docs);
  const dirs = findDirectory(docsPath, Directory.FILE);
  const streams = dirs.map((dir) => {
    const dirName = basename(dir).replace(".md", "");
    return src(dir)
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const mdCode = clone.contents.toString(),
            mdNode = MT(mdCode);
          clone.contents = Buffer.from(
            `export default ${JSON.stringify(mdNode)}`
          );
          this.push(clone);
          callback();
        })
      )
      .pipe(rename("data.ts"))
      .pipe(dest(join(tempPath, docs, dirName)))
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const code = renderString(comDocsTemplateTs, {
            name: dirName,
            connect: "ds",
            data: filename,
          });
          clone.contents = Buffer.from(code);
          this.push(clone);
          callback();
        })
      )
      .pipe(rename("index.tsx"))
      .pipe(dest(join(tempPath, docs, dirName)));
  });
  return mergeStream(...streams);
}

export function comDocsMainTs(options: ICmdUiOptions) {
  const { rootPath, docs, temp } = options;
  const tempPath = findTempDirectory(rootPath, temp);
  // console.log(findDirectory(join(tempPath, docs), Directory.DIRECTORY));
  src(join(tempPath, docs, "**/index.tsx"))
    .pipe(
      obj(function (file, _, callback) {
        const clone = file.clone(),
          filename = basename(file.path),
          name = basename(file.path.replace(filename, ""));
        clone.contents = Buffer.from(`"${name}",`);
        this.push(clone);
        callback();
      })
    )
    .pipe(concat("index.ts"))
    .pipe(
      obj(function (file, _, callback) {
        const clone = file.clone();
        const code = clone.contents.toString();
        console.log(clone.path, code);
        const tempCode = `[${code
          .split(",")
          .filter((a: string) => !!a)
          .join()}]`;
        const componentsArr = uniq<string>(JSON.parse(tempCode));
        const exportCode = `[${componentsArr
          .map(
            (item: string) =>
              `{path: "${item}", Components: ${ClassName(item)}}`
          )
          .join()}]`;
        const importCode = componentsArr.reduce((a: string, b: any) => {
          a += `import ${ClassName(b)} from "./${b}";\n`;
          return a;
        }, "");
        clone.contents = Buffer.from(
          `${importCode}export default { path: "components", children: ${exportCode} }`
        );
        this.push(clone);
        callback();
      })
    )
    .pipe(dest(join(tempPath, docs)));
}
