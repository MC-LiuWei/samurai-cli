/*
 * @Author: 刘伟
 * @Date: 2020-07-04 18:25:12
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-05 00:54:59
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/abstract.gulp-manager.ts
 */
import { join } from "path";
import { statSync, readdirSync } from "fs";
import { AbstractRunner, RunnersOption } from "../runners";

export class AbstractGulpManager {
  constructor(protected compiler: string, protected runner: AbstractRunner) {}

  public async execute(options: RunnersOption[], extraFlags?: string) {
    let command = this.buildCommandLine(options);
    command = extraFlags ? command.concat(` ${extraFlags}`) : command;
    return await this.runner.run(command);
  }

  private buildCommandLine(options: RunnersOption[]) {
    return `${this.compiler} ${this.buildOptions(options)}`;
  }

  private buildOptions(options: RunnersOption[]) {
    return options.reduce((a, b) => {
      return a.concat(` ${b.toCommandString()}`);
    }, "");
  }
}
