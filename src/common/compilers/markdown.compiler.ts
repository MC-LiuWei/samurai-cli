/*
 * @Author: 刘伟
 * @Date: 2020-06-20 11:58:22
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-26 19:07:55
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/markdown.compiler.ts
 */
import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import { AbstractRunner } from "../runners";
import { AbstractCompiler } from ".";
import { RunnersOption } from "../runners";
import { dir } from "console";

export interface MarkdownParams {
  name: string;
  alias: string;
}
export class MarkdownCompiler extends AbstractCompiler {
  private static params: MarkdownParams[] = [];

  constructor(runner: AbstractRunner) {
    super("markdown", runner);
  }

  public async execute(options: RunnersOption[]) {
    const compilerFile = this.findCompilerFilePath("gulpfile.js");
    if (compilerFile) {
      const compilerOption = new RunnersOption("gulpfile", compilerFile);
      options.push(compilerOption);
    }
    return super.execute(options, " --silent");
  }

  // private findCompilerFilePath(
  //   name: string,
  //   path: string = join(__dirname, "../../../")
  // ): string | undefined {
  //   const dirList: string[] = readdirSync(path);
  //   for (let i = 0; i < dirList.length; i++) {
  //     const itemPath = join(path, dirList[i]);
  //     const status = statSync(itemPath);
  //     if (status.isDirectory()) {
  //       if (name == dirList[i]) {
  //         return itemPath;
  //       } else {
  //         const compilerFile = this.findCompilerFilePath(name, itemPath);
  //         if (compilerFile) {
  //           return compilerFile;
  //         } else {
  //           continue;
  //         }
  //       }
  //     } else if (status.isFile() && dirList[i] == name) {
  //       return itemPath;
  //     }
  //   }
  // }

  private validate(name: string) {}
}
