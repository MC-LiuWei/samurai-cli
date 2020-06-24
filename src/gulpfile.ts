/*
 * @Author: 刘伟
 * @Date: 2020-06-17 20:09:33
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 09:53:48
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/gulpfile.ts
 */
import * as gulp from "gulp";
import through2 from "through2";
import { join } from "path";
const files = join(__dirname, "**/*.js");
gulp.task("markdown", (cb) => {
  gulp
    .src([files])
    .pipe(
      through2.obj(function (chunk, enc, callback) {
        console.log(chunk.contents.toString());
        // console.log(enc);
        this.push(chunk);
        callback();
      })
    )
    .pipe(gulp.dest("dist"));
  cb();
});

gulp.task("library:ui", gulp.series([""]));

// gulp.task("default", gulp.series(["markdown"]));
