/*
 * @Author: 刘伟
 * @Date: 2020-06-17 20:09:33
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-29 15:57:12
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/gulpfile.ts
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
import ComponentsApiFactory, {
  ComponentsDetailFactory,
  ComponentsPageFactory,
} from "./task/ui/components";
import { Buffer } from "buffer";
import webpackConfig from "./task/ui/webpack";
import RouterFactory from "./task/ui/router";
const renderer = new ReactDocGenMarkdownRenderer();

const cmdUiOptions: Opts = {
  string: ["rootPath", "path", "language", "docs", "library"],
  default: {
    rootPath: process.cwd(),
    path: "components",
    docs: "docs",
    language: "ts",
    library: "react",
  },
};

gulp.task("ui:merge-page-md", (cb) => {
  const { path, language, docs, library, rootPath } = minimist(
    process.argv.slice(2),
    cmdUiOptions
  );
  const componentPath = join(rootPath, path);
  const docsPath = join(rootPath, docs);
  const streams = readdirSync(componentPath)
    .filter((dir) => statSync(join(componentPath, dir)).isDirectory())
    .map((dir) => {
      const currentPath = join(componentPath, dir);
      console.log(join(docs, path, dir), currentPath);
      return (
        gulp
          .src(join(currentPath, "**/*.tsx"))
          .pipe(
            through2.obj(function (file, enc, callback) {
              const fileClone = file.clone();
              const fileCode = fileClone.contents.toString();
              const reactCode = reactDoc.parse(fileCode);
              const MDCode = renderer.render(fileClone.path, reactCode, []);
              const filename = basename(fileClone.path).replace(
                extname(fileClone.path),
                ""
              );
              fileClone.contents = Buffer.from(MDCode);
              this.push(fileClone);
              callback();
            })
          )
          .pipe(concat("components.api"))
          .pipe(
            gulp.src([
              join(currentPath, "**/*.md"),
              `!${join(currentPath, "**/*.api")}`,
              `!${join(currentPath, "**/example/**/*.md")}`,
            ])
          )
          .pipe(
            through2.obj(function (file, enc, call) {
              const fileClone = file.clone();
              const fileCode = fileClone.contents.toString();
              console.log(fileClone.path);
              this.push(fileClone);
              call();
            })
          )
          .pipe(concat("components.header"))
          // .pipe(
          //   order([
          //     join(currentPath, "**/*.header"),
          //     join(currentPath, "**/*.api"),
          //   ])
          // )
          // .pipe(concat("page.md"))
          .pipe(gulp.dest(join(docsPath, path, dir)))
      );
    });
  merge.apply(null, streams).on("finish", () => {
    console.log("finish");
  });
  cb();
});

gulp.task("ui:make-api-data", (cb) => {
  const { library, ...params } = minimist(process.argv.slice(2), cmdUiOptions);
  const componentToApi = ComponentsApiFactory(library);
  const componentToDetail = ComponentsDetailFactory(library);
  componentToApi(params);
  componentToDetail(params);
  cb();
});

gulp.task("ui:make-docs-router", (cb) => {
  const { library, path, docs, ...params } = minimist(
    process.argv.slice(2),
    cmdUiOptions
  );
  const paths = path.split("/");
  const routerPath = "router";
  const componentsPath = paths.pop();
  const componentToPage = ComponentsPageFactory(library);
  // componentToPage({ ...params, library, path, docs });
  RouterFactory(library)(docs, componentsPath, routerPath);
  cb();
});

gulp.task("ui:make-page-md", (cb) => {
  const { library, path, docs, ...params } = minimist(
    process.argv.slice(2),
    cmdUiOptions
  );
  gulp
    .src([join(path, "**/*.tsx"), join(path, "**/*.md")])
    .pipe(
      through2.obj(function (file, enc, call) {
        const fileClone = file.clone();
        const fileCode = fileClone.contents.toString();
        if (extname(fileClone.path) == ".tsx") {
          const reactCode = reactDoc.parse(fileCode);
          const MDCode = renderer.render(fileClone.path, reactCode, []);
          const filename = basename(fileClone.path).replace(
            extname(fileClone.path),
            ""
          );
          fileClone.extname = `.api`;
          fileClone.contents = Buffer.from(MDCode);
        }
        this.push(fileClone);
        call();
      })
    )
    .pipe(order([join(path, "**/*.md"), join(path, "**/*.api")]))
    .pipe(
      through2.obj(function (file, enc, callback) {
        console.log(file.path);
        this.push(file);
        callback();
      })
    )
    .pipe(concat("page.md"))
    .pipe(gulp.dest(docs));
  cb();
});

gulp.task("ui:make-api-components", (cb) => {
  const { path, docs, language, library } = minimist(
    process.argv.slice(2),
    cmdUiOptions
  );
  const config = webpackConfig(library)({
    entry: join(docs, "src/index"),
    output: join(docs, "dist"),
    publics: join(docs, "publics"),
  });
  webpack(config, function (err, status) {
    cb();
  });
});

gulp.task("ui", gulp.series(["ui:merge-page-md"]));
