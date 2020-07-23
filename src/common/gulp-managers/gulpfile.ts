/*
 * @Author: 刘伟
 * @Date: 2020-07-04 18:07:24
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-15 23:21:22
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/gulpfile.ts
 */
import del from "del";
import * as gulp from "gulp";
import minimist, { Opts } from "minimist";
import { join } from "path";
import { comComTsReact } from "./task/ui/components/ts/react";
import { conDocsTs, comDocsMainTs } from "./task/ui/docs/ts";
import { findTempDirectory } from "../../utils";

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

gulp.task("ui:clear", (cb) => {
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
  const tempPath = findTempDirectory(rootPath, temp);
  del([tempPath], {
    force: true,
  })
    .then(() => cb())
    .catch(() => cb());
});

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
gulp.task("ui:compiler-docsmain", (cb) => {
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
  comDocsMainTs({
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

gulp.task(
  "ui",
  gulp.series([
    "ui:clear",
    "ui:compiler-components",
    "ui:compiler-docs",
    "ui:compiler-docsmain",
  ])
);
