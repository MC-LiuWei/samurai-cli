/*
 * @Author: 刘伟
 * @Date: 2020-03-10 15:20:40
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 17:35:08
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/commands/command.loader.ts
 */
import { CommanderStatic } from "commander";
import { red } from "chalk";
import { PackageCommand, CreateCommand } from ".";
import { PackageAction, CreateAction } from "../actions";

export class CommandLoader {
  public static load(program: CommanderStatic): void {
    new PackageCommand(new PackageAction()).load(program);
    new CreateCommand(new CreateAction()).load(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on("command:*", () => {
      console.error(`\nInvalid command: ${red("%s")}`, program.args.join(" "));
      console.log(`See ${red("--help")} for a list of available commands.\n`);
      process.exit(1);
    });
  }
}
