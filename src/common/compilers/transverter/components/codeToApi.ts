/*
 * @Author: 刘伟
 * @Date: 2020-06-26 23:00:26
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-27 03:10:49
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/transverter/components/codeToApi.ts
 */
import gulp from "gulp";
import through2 from "through2";
import MT from "mark-twain";
import order from "gulp-order";
import concat from "gulp-concat";
import { readdirSync } from "fs";
import * as reactDoc from "react-docgen";
import ReactDocGenMarkdownRenderer from "react-docgen-markdown-renderer";
import { join } from "path";
const renderer = new ReactDocGenMarkdownRenderer();

function reactComponentsCodeApiToMd(filePath: string, code: string) {
  return {
    extname: renderer.extension,
    code: renderer.render(filePath, code, []),
  };
}

function reactComponentsCodeToApi(path: string, docs: string) {
  const docsDirs = readdirSync(path).map((dir) => join(path, dir, ""));
  return (
    gulp
      .src([
        join(path, "**/*.tsx"),
        `!${join(path, "**/*.test.tsx")}`,
        `!${join(path, "**/*.test.ts")}`,
        `!${join(path, "**/*.test.jsx")}`,
        `!${join(path, "**/*.test.js")}`,
      ])
      .pipe(
        through2.obj(function (file, enc, callback) {
          const fileClone = file.clone();
          const fileCode = fileClone.contents.toString();
          const reactCode = reactDoc.parse(fileCode);
          const fileContent = reactComponentsCodeApiToMd(
            fileClone.path,
            reactCode
          );
          const { content } = MT(fileContent.code);
          console.log(fileClone.filename);
          fileClone.extname = `.api.ts`;
          fileClone.contents = Buffer.from(
            `const api = ${JSON.stringify(content)}`
          );
          this.push(fileClone);
          callback();
        })
      )
      // .pipe(order([join(path, "**/*.api.ts")]))
      // .pipe(
      //   through2.obj(function (file, enc, callback) {
      //     const fileClone = file.clone();
      //     const fileCode = fileClone.contents.toString();
      //     console.log(fileCode);
      //     this.push(fileClone);
      //     callback();
      //   })
      // )
      .pipe(gulp.dest(docs))
  );
}

export default function generateComponentsApi(
  library: string,
  path: string,
  docs: string
) {
  switch (library) {
    case "react":
      return reactComponentsCodeToApi(path, docs);
      break;
    default:
      return reactComponentsCodeToApi(path, docs);
      break;
  }
}
