/*
 * @Author: 刘伟
 * @Date: 2020-06-11 16:14:27
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 17:04:19
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/commands/command.package.ts
 */
import { CommanderStatic, Command } from "commander";
import { join } from "path";
import { readFileSync } from "fs";
import { AbstractCommand } from "./abstract.command";
import { Input } from "./command.input";

export class PackageCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program
      .command("package")
      .alias("pkg")
      .description("package")
      .option("-c, --checkVersion", "check package version")
      .action(async (command: Command) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        const { checkVersion } = command;
        const cwd = process.cwd(),
          pkgJsonPath = join(cwd, "package.json");
        const packageJsonStr = readFileSync(pkgJsonPath, { encoding: "utf8" }),
          packageJson = JSON.parse(packageJsonStr);
        inputs.push({
          name: "packageInfo",
          value: packageJson,
        });
        options.push({
          name: "checkVersion",
          value: !!checkVersion,
        });
        await this.action.handle(inputs, options);
      });
  }
}
