/*
 * @Author: 刘伟
 * @Date: 2020-06-24 18:47:16
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-29 14:33:47
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/ui.compiler.ts
 */
import { join } from "path";
import { AbstractCompiler } from ".";
import { RunnersOption, AbstractRunner } from "../runners";
import { runnerLoading } from "../ui/loading";
export class UiCompiler extends AbstractCompiler {
  constructor(runner: AbstractRunner) {
    super("ui", runner);
  }

  public async execute(options: RunnersOption[]) {
    const loading = runnerLoading("组件文档编译");
    const compilerFile = this.findCompilerFilePath("gulpfile.js");
    if (compilerFile) {
      const gulpfileOption = new RunnersOption("gulpfile", compilerFile);
      options.push(gulpfileOption);
    }
    loading.start();
    await super.execute(options);
    loading.stop();
  }
}
