/*
 * @Author: 刘伟
 * @Date: 2020-06-17 20:09:33
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 19:16:51
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/gulpfile.ts
 */
import * as gulp from "gulp";
import * as reactDoc from "react-docgen";
import minimist from "minimist";
import through2 from "through2";
import { join } from "path";
import { Stream } from "stream";
const files = join(__dirname, "../../../test/**/*.tsx");
gulp.task("ui", (cb) => {
  console.log(files);
  compilerReactToMd(gulp.src(files));
  cb();
});

gulp.task("default", gulp.series(["ui"]));

function compilerReactToMd(stream: Stream) {
  return stream.pipe(
    through2.obj(function (file, enc, callback) {
      const fileCode = file.contents.toString();
      console.log(reactDoc);
      const reactCode = reactDoc.parse(fileCode);
      console.log(reactCode);
    })
  );
}
