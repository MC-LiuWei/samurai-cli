/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:36:44
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-17 19:44:10
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/commands/command.compile.ts
 */
import { CommanderStatic, Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";

export class CompileCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("compile <task>")
      .alias("cpe")
      .description("")
      .action(async (task: string, command: Command) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        inputs.push({
          name: "task",
          value: task,
        });
        await this.action.handle(inputs, options);
      });
  }
}
