/*
 * @Author: 刘伟
 * @Date: 2020-06-18 20:45:23
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-18 20:53:57
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/compilers.factory.ts
 */

import { Compiler, MarkdownCompiler } from ".";

export class CompilersFactory {
  public static create(compiler: Compiler) {
    switch (compiler) {
      case Compiler.MARKDOWN:
        return new MarkdownCompiler();
        break;

      default:
        break;
    }
  }
}
