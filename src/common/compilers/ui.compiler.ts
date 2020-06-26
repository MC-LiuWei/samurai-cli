/*
 * @Author: 刘伟
 * @Date: 2020-06-24 18:47:16
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-27 02:57:02
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/ui.compiler.ts
 */
import { AbstractCompiler } from ".";
import { RunnersOption, AbstractRunner } from "../runners";
import { join } from "path";

export class UiCompiler extends AbstractCompiler {
  constructor(runner: AbstractRunner) {
    super("ui", runner);
  }

  public async execute(options: RunnersOption[]) {
    const compilerFile = this.findCompilerFilePath("gulpfile.js");
    const commandOptions = this.conversionConfigPathOptions(options);
    if (compilerFile) {
      const compilerOption = new RunnersOption("gulpfile", compilerFile);
      commandOptions.push(compilerOption);
    }
    return super.execute(commandOptions, " --silent");
  }

  private conversionConfigPathOptions(
    options: RunnersOption[],
    cwd = process.cwd()
  ) {
    const includeRunnerOptions = ["docs", "path"];
    return options.map((opt) => {
      if (includeRunnerOptions.includes(opt.getName())) {
        return new RunnersOption(
          opt.getName(),
          join(cwd, opt.getValue() as string)
        );
      }
      return opt;
    });
  }
}
