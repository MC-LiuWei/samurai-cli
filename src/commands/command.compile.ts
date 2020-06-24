/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:36:44
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 19:06:53
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/commands/command.compile.ts
 */
import { CommanderStatic, Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";
import message from "../common/ui/message";
import { join } from "path";
export class CompileCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("compile")
      .alias("cpe")
      .description("")
      .option("-p, --path [outpath]")
      .action(async (command: Command) => {
        const cwd = process.cwd(),
          compilerJsonFilePath = join(cwd, "samurai.json");
        const options: Input[] = [];
        const inputs: Input[] = [];

        // inputs.push({
        //   name: "task",
        //   value: task,
        // });
        options.push({
          name: "config",
          value: compilerJsonFilePath,
        });
        await this.action.handle(inputs, options);
      });
  }
}