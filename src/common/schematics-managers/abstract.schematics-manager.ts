/*
 * @Author: 刘伟
 * @Date: 2020-06-13 13:00:16
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-22 13:11:12
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/schematics-managers/abstract.schematics-manager.ts
 */
import { AbstractRunner } from "../runners/abstract.runner";
import { RunnersOption } from "../runners";

export class AbstractSchematicsManager {
  constructor(protected schematics: string, protected runner: AbstractRunner) {}

  public async execute(
    name: string,
    options: RunnersOption[],
    extraFlags?: string
  ) {
    let command = this.buildCommandLine(name, options);
    command = extraFlags ? command.concat(` ${extraFlags}`) : command;
    await this.runner.run(command);
  }

  private buildCommandLine(name: string, options: RunnersOption[]): string {
    return `${this.schematics}:${name}${this.buildOptions(options)}`;
  }

  private buildOptions(options: RunnersOption[]): string {
    return options.reduce((line, option) => {
      return line.concat(` ${option.toCommandString()}`);
    }, "");
  }
}
