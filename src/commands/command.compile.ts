/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:36:44
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-26 20:33:41
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/commands/command.compile.ts
 */
import { CommanderStatic, Command } from "commander";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";
export class CompileCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("compiler")
      .alias("cpe")
      .description("compiler")
      // .option(
      //   "-l, --language [language]",
      //   "Programming language to be used (TypeScript or JavaScript)."
      // )
      .option(
        "-c, --config [config]",
        "Compile the configuration file for the command"
      )
      .action(async (command: Command) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        options.push({
          name: "config",
          value: !!command.config ? command.config : "samurai.json",
        });
        await this.action.handle(inputs, options);
      });
  }
}
