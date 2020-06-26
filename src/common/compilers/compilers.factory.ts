/*
 * @Author: 刘伟
 * @Date: 2020-06-18 20:45:23
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 21:46:50
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/compilers.factory.ts
 */

import { Compiler, MarkdownCompiler, UiCompiler } from ".";
import { RunnerFactory, Runner, GulpRunner } from "../runners";

export class CompilersFactory {
  public static create(compiler: Compiler | string) {
    switch (compiler) {
      case Compiler.MARKDOWN:
        return new MarkdownCompiler(
          RunnerFactory.create(Runner.GULP) as GulpRunner
        );
        break;
      case Compiler.UI:
        return new UiCompiler(RunnerFactory.create(Runner.GULP) as GulpRunner);
        break;
      default:
        break;
    }
  }
}
