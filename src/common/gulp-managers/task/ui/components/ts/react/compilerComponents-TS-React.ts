/*
 * @Author: 刘伟
 * @Date: 2020-07-04 18:52:27
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-14 23:19:50
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/task/ui/components/ts/react/compilerComponents-TS-React.ts
 */
import del from "del";
import merge from "gulp-merge";
import concat from "gulp-concat";
import rename from "gulp-rename";
import * as ReactDocs from "react-docgen";
import ReactToMd from "react-docgen-markdown-renderer";
import MT from "mark-twain";
import { join, basename } from "path";
import { src, dest } from "gulp";
import { obj } from "through2";
import { Buffer } from "buffer";
import { createContext, runInContext } from "vm";
import { renderString } from "nunjucks";
import { comMainTemplateTsReact } from "./componenTsTemplate-TS-React";
import { ICmdUiOptions } from "../../../../../gulps";
import {
  findDirectory,
  Directory,
  findTempDirectory,
  ClassName,
} from "../../../../../../../utils";
import templateObject from "./template";

const render = new ReactToMd({
  template: templateObject,
});

/**
 * @description 编译组件
 * @author liu wei
 * @date 2020-07-05
 * @export
 * @param {ICmdUiOptions} options
 * @returns
 */
export function comComTsReact(options: ICmdUiOptions) {
  const { components, rootPath, temp, demo } = options;
  const componentsPath = join(rootPath, components),
    tempPath = findTempDirectory(rootPath, temp);
  const dirs = findDirectory(componentsPath, Directory.DIRECTORY);
  del([join(tempPath, components)]);

  const streams = dirs.map((dir) => {
    const dirName = basename(dir);
    const apiStreams = src([join(dir, "**/*.tsx"), `!${join(dir, demo)}`])
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const fileCode = clone.contents.toString(),
            reactCode = ReactDocs.parse(fileCode),
            mdCode = render.render(clone.path, reactCode, []);
          const content = MT(mdCode);
          clone.extname = ".api";
          clone.contents = Buffer.from(
            `${filename} = ${JSON.stringify(content)}`
          );
          this.push(clone);
          callback();
        })
      )
      .pipe(concat("api.ts"))
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const fileCode = clone.contents.toString();
          const context = {};
          createContext(context);
          runInContext(fileCode, context);
          clone.extname = ".api";
          clone.contents = Buffer.from(
            `${filename} = ${JSON.stringify(context)}`
          );
          this.push(clone);
          callback();
        })
      )
      .pipe(dest(join(tempPath, components, dirName)));

    const demoStreams = src(join(dir, demo))
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const fileCode = clone.contents.toString();
          const mdNode = MT(fileCode);
          clone.extname = ".demo";
          clone.contents = Buffer.from(
            `${filename} = ${JSON.stringify(mdNode)}`
          );
          this.push(clone);
          callback();
        })
      )
      .pipe(concat("demo.demo"))
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const fileCode = clone.contents.toString();
          const context = {};
          createContext(context);
          runInContext(fileCode, context);
          clone.extname = ".demo";
          clone.contents = Buffer.from(
            `${filename} = ${JSON.stringify(context)}`
          );
          this.push(clone);
          callback();
        })
      )
      .pipe(dest(join(tempPath, components, dirName)));

    return merge([apiStreams, demoStreams])
      .pipe(
        src([
          join(tempPath, components, dirName, "**/*.api"),
          join(tempPath, components, dirName, "**/*.demo"),
        ])
      )
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone();
          this.push(clone);
          callback();
        })
      )
      .pipe(concat("data.data"))
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const fileCode = clone.contents.toString();
          const context = {};
          createContext(context);
          runInContext(fileCode, context);
          clone.extname = ".ts";
          clone.contents = Buffer.from(
            `export default ${JSON.stringify(context)}`
          );
          this.push(clone);
          callback();
        })
      )
      .pipe(dest(join(tempPath, components, dirName)))
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const code = renderString(comMainTemplateTsReact, {
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
      .pipe(dest(join(tempPath, components, dirName)))
      .on("finish", () => {
        del(
          [
            join(tempPath, components, dirName, "**/*.api"),
            join(tempPath, components, dirName, "**/*.demo"),
          ],
          {
            force: true,
          }
        );
      });
  });
  return merge(...streams)
    .pipe(src(join(tempPath, components, "**/index.tsx")))
    .pipe(
      obj(function (file, _, callback) {
        const clone = file.clone(),
          filename = basename(file.path),
          name = basename(file.path.replace(filename, ""));
        clone.contents = Buffer.from(`{
          path: "${name}",
          components: ${ClassName(name)}
        },`);
        this.push(clone);
        callback();
      })
    )
    .pipe(concat("index.ts"))
    .pipe(
      obj(function (file, _, callback) {
        const clone = file.clone();
        const code = clone.contents.toString(),
          tempCode = code
            .split(",")
            .filter((a: string) => !!a)
            .join();
        console.log(tempCode);
        const importCode = tempCode.reduce((a: string, b: any) => {
          const com = JSON.parse(b);
          a += `import ${ClassName(com.path)} from "${com.path}";\n`;
          return a;
        }, "");
        clone.contents = Buffer.from(
          `${importCode} export default ${tempCode}`
        );
        this.push(clone);
        callback();
      })
    )
    .pipe(dest(join(tempPath, components)));
}
