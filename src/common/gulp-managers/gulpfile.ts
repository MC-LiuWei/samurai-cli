/*
 * @Author: 刘伟
 * @Date: 2020-07-04 18:07:24
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-14 23:35:25
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/gulpfile.ts
 */
import * as gulp from "gulp";
import { readdirSync, statSync } from "fs";
import minimist, { Opts } from "minimist";
import webpack from "webpack";
import through2 from "through2";
import order from "gulp-order";
import concat from "gulp-concat";
import merge from "gulp-merge";
import pump from "pump";
import * as reactDoc from "react-docgen";
import ReactDocGenMarkdownRenderer from "react-docgen-markdown-renderer";
import MT from "mark-twain";
import { join, extname, basename } from "path";
import { comComTsReact } from "./task/ui/components/ts/react";
import { conDocsTs } from "./task/ui/docs/ts";
import { ICmdUiOptions } from ".";
const renderer = new ReactDocGenMarkdownRenderer();

const cmdUiOptions: Opts = {
  string: ["rootPath", "path", "language", "docs", "library"],
  default: {
    rootPath: process.cwd(),
    components: "components",
    demo: "**/demo/*.md",
    docs: "docs",
    logs: "logs",
    output: "dist",
    language: "ts",
    library: "react",
    temp: ".temp",
  },
};

gulp.task("ui:compiler-components", (cb) => {
  const {
    rootPath,
    components,
    demo,
    docs,
    logs,
    output,
    language,
    library,
    temp,
  } = minimist(process.argv.slice(2), cmdUiOptions);
  comComTsReact({
    rootPath,
    components,
    docs,
    logs,
    demo,
    language,
    library,
    temp,
    output,
  });
  cb();
});
gulp.task("ui:compiler-docs", (cb) => {
  const {
    rootPath,
    components,
    demo,
    docs,
    logs,
    output,
    language,
    library,
    temp,
  } = minimist(process.argv.slice(2), cmdUiOptions);
  conDocsTs({
    rootPath,
    components,
    docs,
    logs,
    demo,
    language,
    library,
    temp,
    output,
  });
  cb();
});

gulp.task("ui", gulp.series(["ui:compiler-components", "ui:compiler-docs"]));
