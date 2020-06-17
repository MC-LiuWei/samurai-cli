/*
 * @Author: 刘伟
 * @Date: 2020-06-17 20:09:33
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-17 20:51:38
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/gulpfile.ts
 */
import gulp from "gulp";
import through2 from "through2";

gulp.task("compiler:doc", (cb) => {
  gulp.src(["components/**/*.tsx"]).pipe(through2.obj());
});
