/*
 * @Author: 刘伟
 * @Date: 2020-06-27 16:07:09
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 18:51:29
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/components/react/codeToApiComponents.ts
 */
import gulp from "gulp";
import through2 from "through2";
import MT from "mark-twain";
import { ParsedArgs } from "minimist";
import gulpMerge from "gulp-merge";
import concat from "gulp-concat";
import { readdirSync } from "fs";
import vm from "vm";
import { basename, extname } from "path";
import * as reactDoc from "react-docgen";
import ReactDocGenMarkdownRenderer from "react-docgen-markdown-renderer";
import { join } from "path";
import { Buffer } from "buffer";
import apiComponents from "./componentsTemplate";
import templateObject from "./componentsMdTemplate";

const renderer = new ReactDocGenMarkdownRenderer({
  template: templateObject,
});

export default function makeReactToApi(
  options: ParsedArgs
): NodeJS.ReadWriteStream {
  const { path, docs, language, library } = options;
  const rootPath = path.split("/").pop() as string;
  const streams = readdirSync(path).map((dir) => {
    const componentsPath = join(path, dir);
    const docsPath = join(docs, rootPath, dir);
    return gulp
      .src([
        join(componentsPath, "**/*.tsx"),
        `!${join(componentsPath, "**/*.test.tsx")}`,
        `!${join(componentsPath, "**/*.test.ts")}`,
        `!${join(componentsPath, "**/*.test.jsx")}`,
        `!${join(componentsPath, "**/*.test.js")}`,
      ])
      .pipe(
        through2.obj(function (file, enc, callback) {
          const fileClone = file.clone();
          const fileCode = fileClone.contents.toString();
          const reactCode = reactDoc.parse(fileCode);
          const MDCode = renderer.render(fileClone.path, reactCode, []);
          const { content } = MT(MDCode);
          const filename = basename(fileClone.path).replace(
            extname(fileClone.path),
            ""
          );
          fileClone.extname = `.api`;
          fileClone.contents = Buffer.from(
            `${filename} = ${JSON.stringify(content)}`
          );
          this.push(fileClone);
          callback();
        })
      )
      .pipe(concat("api.ts"))
      .pipe(
        through2.obj(function (file, enc, callback) {
          const fileClone = file.clone();
          const fileCode = fileClone.contents.toString();
          const data = {};
          vm.createContext(data);
          vm.runInContext(fileCode, data);
          const componentCode = apiComponents(JSON.stringify(data));
          fileClone.extname = ".tsx";
          fileClone.contents = Buffer.from(componentCode);
          this.push(fileClone);
          callback();
        })
      )
      .pipe(gulp.dest(docsPath));
  });
  return gulpMerge.apply(null, streams);
}
