/*
 * @Author: 刘伟
 * @Date: 2020-06-13 17:10:56
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 17:41:23
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/commands/command.create.ts
 */
import Table from "cli-table3";
import { CommanderStatic, Command, option } from "commander";
import { join } from "path";
import { readFileSync } from "fs";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";
import {
  SamuraiSchematicsManager,
  Schematics,
} from "../common/schematics-managers";

export class CreateCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("create <schematic> [name]")
      .description(this.buildDescription())
      .option(
        "-l, --language [language]",
        "Programming language to be used (TypeScript or JavaScript)."
      )
      .option(
        "-lib, --library [library]",
        "The base libraries to use (React or Vue)."
      )
      .option(
        "-c, --collection [collectionName]",
        "Schematics collection to use."
      )
      .action(async (schematic: string, name: string, command: Command) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        options.push({
          name: "library",
          value: !!command.library ? command.library : "react",
        });
        options.push({
          name: "language",
          value: !!command.language ? command.language : "ts",
        });
        options.push({
          name: "collection",
          value: command.collection || Schematics.SAMURAI,
        });
        inputs.push({ name: "schematic", value: schematic });
        inputs.push({ name: "name", value: name });

        await this.action.handle(inputs, options);
      });
  }

  private buildDescription(): string {
    return (
      "Create a Node package.\n" +
      "  Available schematics:\n" +
      this.buildSchematicsListAsTable()
    );
  }

  private buildSchematicsListAsTable(): string {
    const leftMargin = "    ";
    const tableConfig = {
      head: ["name", "alias"],
      chars: {
        left: leftMargin.concat("│"),
        "top-left": leftMargin.concat("┌"),
        "bottom-left": leftMargin.concat("└"),
        mid: "",
        "left-mid": "",
        "mid-mid": "",
        "right-mid": "",
      },
    };
    const table: any = new Table(tableConfig);
    for (const schematic of SamuraiSchematicsManager.getSchematics()) {
      table.push([schematic.name, schematic.alias]);
    }
    return table.toString();
  }
}
