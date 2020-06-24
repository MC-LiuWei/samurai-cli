/*
 * @Author: 刘伟
 * @Date: 2020-06-24 18:47:16
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 18:53:31
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/ui.compiler.ts
 */
import { AbstractCompiler } from ".";
import { RunnersOption, AbstractRunner } from "../runners";

export class UiCompiler extends AbstractCompiler {
  constructor(runner: AbstractRunner) {
    super("ui", runner);
  }

  public async execute(options: RunnersOption[]) {
    const compilerFile = this.findCompilerFilePath("gulpfile.js");
    if (compilerFile) {
      const compilerOption = new RunnersOption("gulpfile", compilerFile);
      options.push(compilerOption);
    }
    super.execute(options, " --silent");
  }
}
