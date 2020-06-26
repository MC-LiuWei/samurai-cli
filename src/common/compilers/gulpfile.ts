/*
 * @Author: 刘伟
 * @Date: 2020-06-17 20:09:33
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-27 03:05:48
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/gulpfile.ts
 */
import * as gulp from "gulp";
import { readdirSync } from "fs";
import minimist, { Opts } from "minimist";
import through2 from "through2";
import order from "gulp-order";
import concat from "gulp-concat";
import pump from "pump";
import mergeStream from "merge-stream";
import MT from "mark-twain";
import { join, extname, basename } from "path";
import generateComponentsApi from "./transverter/components/codeToApi";
import { Buffer } from "buffer";

const cmdUiOptions: Opts = {
  string: ["path", "language", "docs", "library"],
  default: {
    path: "components",
    docs: "docs",
    language: "ts",
    library: "react",
  },
};

gulp.task("ui:docs", (cb) => {
  const { path, docs, language, library } = minimist(
    process.argv.slice(2),
    cmdUiOptions
  );
  generateComponentsApi(library, path, docs).on("finish", () => {
    const docsDirs = readdirSync(docs).map((dir) => {
      return gulp
        .src(join(docs, dir, "**/*.api.ts"))
        .pipe(concat("api.ts"))
        .pipe(gulp.dest(join(docs, dir)));
    });
    mergeStream.apply(null, docsDirs);
  });
  cb();
});

gulp.task("ui:docs-components", (cb) => {
  const { path, docs, language, library } = minimist(
    process.argv.slice(2),
    cmdUiOptions
  );
  const dirs = readdirSync(docs).map((docsPath) => {
    return gulp
      .src(join(docs, docsPath, "**/*.api.md"))
      .pipe(
        through2.obj(function (file, enc, callback) {
          const fileClone = file.clone();
          const { content } = MT(fileClone.contents.toString());
          fileClone.extname = ".ts";
          fileClone.contents = Buffer.from(
            `import react from 'react'\n ${JSON.stringify(content)}`
          );
          this.push(fileClone);
        })
      )
      .pipe(gulp.src(join(docs, docsPath, "**/*.ts")))
      .pipe(
        through2.obj(function (chunk, en, call) {
          const fileClone = chunk.clone();
          // const { content } = MT(fileClone.contents.toString());
          // fileClone.extname = ".ts";
          // fileClone.contents = Buffer.from(
          //   `import react from 'react'\n ${JSON.stringify(content)}`
          // );
          console.log(fileClone.extname, fileClone.contents.toString());
          this.push(fileClone);
          call();
        })
      )
      .pipe(concat("api.ts"))
      .pipe(gulp.dest(join(docs)));
  });
  mergeStream.apply(null, dirs);
  cb();
});

gulp.task("ui", gulp.series(["ui:docs"]));
