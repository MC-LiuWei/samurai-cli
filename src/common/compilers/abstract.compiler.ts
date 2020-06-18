/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:49:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-18 20:53:03
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/abstract.compiler.ts
 */
import gulp from "gulp";
import { CompilersOptions } from ".";

export class AbstractCompiler {
  constructor(protected runner: string) {}

  public async compiler(
    name: string,
    options: CompilersOptions[],
    extraFlags?: string
  ) {
    const metadata = { task: name };
    return new Promise((res) => {
      gulp.src([]);
    });
  }
}
