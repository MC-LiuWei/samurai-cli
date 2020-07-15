import { dest, src } from "gulp";
import { basename, join } from "path";
import { obj } from "through2";
import { Buffer } from "buffer";
import { renderString } from "nunjucks";
import rename from "gulp-rename";
import mergeStream from "gulp-merge";
import MT from "mark-twain";
import {
  Directory,
  findDirectory,
  findTempDirectory,
} from "../../../../../../utils";
import { ICmdUiOptions } from "../../../../gulps";
import { comDocsTemplateTs } from "./comDocsTemplate-TS";

/**
 * 文档界面生成器
 *
 * @export
 * @param {ICmdUiOptions} options
 * @returns
 */
export function conDocsTs(options: ICmdUiOptions) {
  const { rootPath, docs, temp } = options;
  const tempPath = findTempDirectory(rootPath, temp),
    docsPath = join(rootPath, docs);
  const dirs = findDirectory(docsPath, Directory.FILE);
  const streams = dirs.map((dir) => {
    const dirName = basename(dir).replace(".md", "");
    return src(dir)
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const mdCode = clone.contents.toString(),
            mdNode = MT(mdCode);
          clone.contents = Buffer.from(
            `export default ${JSON.stringify(mdNode)}`
          );
          this.push(clone);
          callback();
        })
      )
      .pipe(rename("data.ts"))
      .pipe(dest(join(tempPath, docs, dirName)))
      .pipe(
        obj(function (file, _, callback) {
          const clone = file.clone(),
            ext = clone.extname,
            filename = basename(clone.path).replace(ext, "");
          const code = renderString(comDocsTemplateTs, {
            name: dirName,
            connect: "ds",
            data: filename,
          });
          clone.contents = Buffer.from(code);
          this.push(clone);
          callback();
        })
      )
      .pipe(rename("index.jsx"))
      .pipe(dest(join(tempPath, docs, dirName)));
  });
  return mergeStream.apply(null, streams);
}
