/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:49:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 18:51:10
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/abstract.compiler.ts
 */
import * as gulp from "gulp";
import { join } from "path";
import { statSync, readdirSync } from "fs";
import { Runner, AbstractRunner, RunnersOption } from "../runners";

export class AbstractCompiler {
  constructor(protected compiler: string, protected runner: AbstractRunner) {}

  public async execute(options: RunnersOption[], extraFlags?: string) {
    const metadata = { task: this.compiler };
    const path = process.cwd();
    let command = this.buildCommandLine(options);
    command = extraFlags ? command.concat(` ${extraFlags}`) : command;
    await this.runner.run(command);
  }

  protected findCompilerFilePath(
    name: string,
    path: string = join(__dirname, "../../../")
  ): string | undefined {
    const dirList: string[] = readdirSync(path);
    for (let i = 0; i < dirList.length; i++) {
      const itemPath = join(path, dirList[i]);
      const status = statSync(itemPath);
      if (status.isDirectory()) {
        if (name == dirList[i]) {
          return itemPath;
        } else {
          const compilerFile = this.findCompilerFilePath(name, itemPath);
          if (compilerFile) {
            return compilerFile;
          } else {
            continue;
          }
        }
      } else if (status.isFile() && dirList[i] == name) {
        return itemPath;
      }
    }
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
