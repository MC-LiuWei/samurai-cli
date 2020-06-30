/*
 * @Author: 刘伟
 * @Date: 2020-06-28 14:44:45
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-01 00:07:14
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/components/react/codeToDetailComponents.ts
 */
import gulp from "gulp";
import concat from "gulp-concat";
import through2 from "through2";
import MT from "mark-twain";
import merge from "gulp-merge";
import { readdirSync, statSync } from "fs";
import { ParsedArgs } from "minimist";
import { join } from "path";
import { detailComponents } from "./componentsTemplate";
import { Buffer } from "buffer";

export default function makeReactToDetail(options: ParsedArgs) {
  const { path, docs, language, library } = options;
  const rootPath = path.split("/").pop() as string;
  const componentDirs = readdirSync(path).filter((dir) =>
    statSync(join(path, dir)).isDirectory()
  );
  const streams = componentDirs.map((cdir) => {
    const componentPath = join(path, cdir);
    return gulp
      .src([
        join(componentPath, "**/*.md"),
        `!${join(componentPath, "**/example/**/*.md")}`,
      ])
      .pipe(concat("detail.md"))
      .pipe(
        through2.obj(function (file, en, callback) {
          const fileClone = file.clone();
          const { content } = MT(fileClone.contents.toString());
          const code = detailComponents(JSON.stringify(content));
          fileClone.extname = ".tsx";
          fileClone.contents = Buffer.from(code);
          this.push(fileClone);
          callback();
        })
      )
      .pipe(gulp.dest(join(docs, rootPath, cdir)));
  });
  return merge.apply(null, streams);
}
