/*
 * @Author: 刘伟
 * @Date: 2020-06-18 20:45:23
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-22 12:52:57
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/compilers.factory.ts
 */

import { Compiler, MarkdownCompiler } from ".";
import { RunnerFactory, Runner, GulpRunner } from "../runners";

export class CompilersFactory {
  public static create(compiler: Compiler | string) {
    switch (compiler) {
      case Compiler.MARKDOWN:
        return new MarkdownCompiler(
          RunnerFactory.create(Runner.GULP) as GulpRunner
        );
        break;
      default:
        break;
    }
  }
}
