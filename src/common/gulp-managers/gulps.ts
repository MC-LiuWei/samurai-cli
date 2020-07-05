/*
 * @Author: 刘伟
 * @Date: 2020-07-04 18:30:40
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-05 01:04:29
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/gulps.ts
 */

export enum Gulp {
  MARKDOWN = "markdown", // markdown文档
  UI = "ui",
}

export interface ICmdUiOptions {
  rootPath: string;
  components: string;
  demo: string;
  docs: string;
  logs: string;
  language: string;
  library: string;
  temp: string;
  output: string;
}
