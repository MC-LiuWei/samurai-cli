/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:36:44
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 09:46:15
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/commands/command.compile.ts
 */
import { CommanderStatic, Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";
import message from "../common/ui/message";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
export class CompileCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("compile <task>")
      .alias("cpe")
      .description("")
      .option("-p, --path [outpath]")
      .action(async (task: string, command: Command) => {
        const cwd = process.cwd(),
          compilerJson = join(cwd, "samurai.json");
        const options: Input[] = [];
        const inputs: Input[] = [];
        if (!existsSync(compilerJson)) {
          console.log(message.notFileError("samurai.json"));
          process.exit(1);
        }
        console.log(readFileSync(compilerJson, { encoding: "utf8" }));
        inputs.push({
          name: "task",
          value: task,
        });
        // options.push({
        //   name: "outpath",
        //   value: !!command.outpath ? command.outpath : "components",
        // });
        await this.action.handle(inputs, options);
      });
  }
}
