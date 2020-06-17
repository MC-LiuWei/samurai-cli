/*
 * @Author: 刘伟
 * @Date: 2020-06-13 13:00:16
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-17 19:52:49
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/schematics-managers/abstract.schematics-manager.ts
 */
import { AbstractRunner } from "../runners/abstract.runner";
import { SchematicOption } from "./schematics.options";

export class AbstractSchematicsManager {
  constructor(protected schematics: string, protected runner: AbstractRunner) {}

  public async execute(
    name: string,
    options: SchematicOption[],
    extraFlags?: string
  ) {
    let command = this.buildCommandLine(name, options);
    command = extraFlags ? command.concat(` ${extraFlags}`) : command;
    await this.runner.run(command);
  }

  private buildCommandLine(name: string, options: SchematicOption[]): string {
    return `${this.schematics}:${name}${this.buildOptions(options)}`;
  }

  private buildOptions(options: SchematicOption[]): string {
    return options.reduce((line, option) => {
      return line.concat(` ${option.toCommandString()}`);
    }, "");
  }
}
