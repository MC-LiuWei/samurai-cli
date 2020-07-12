/*
 * @Author: 刘伟
 * @Date: 2020-07-04 18:26:27
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-13 06:46:47
 * @Description: ui组件库的编译过程
 * @FilePath: /samurai-cli/src/common/gulp-managers/ui.gulp-manager.ts
 */
import { AbstractGulpManager } from ".";
import { RunnersOption, AbstractRunner } from "../runners";
import { runnerLoading } from "../ui/loading";
import { ICompilerConfig } from "../..";
import { join } from "path";
import { readdirSync, readFileSync } from "fs";
import { findDirectory, Directory } from "../../utils";
import { statusMessage, MessageType } from "../ui/message";
export class UiGulpManager extends AbstractGulpManager {
  constructor(runner: AbstractRunner) {
    super("ui", runner);
  }

  private fileRepeatCheck(
    targetPath: string[],
    sourcePath: string[]
  ): string[] {
    const sourceSet = new Set(sourcePath);
    return [...targetPath].filter((target) => sourceSet.has(target));
  }

  /**
   * @description 在文档中查找编译配置文件
   * @author liu wei
   * @date 2020-07-13
   * @private
   * @param {string[]} filenames // 当前项目根目录下的目录结构
   * @returns {ICompilerConfig}
   * @memberof UiGulpManager
   */
  private findCompilerConfig(filenames: string[]): ICompilerConfig {
    const _filenames = filenames.map((filename) =>
        join(process.cwd(), filename)
      ),
      _fileDirs = findDirectory(process.cwd(), Directory.FILE);
    const compilerConfigFile = this.fileRepeatCheck(_filenames, _fileDirs);
    if (!compilerConfigFile.length) {
      console.log(statusMessage(MessageType.ERROR, "无编译配置文件"));
      process.exit(1);
    }
    if (compilerConfigFile.length >= 2) {
      console.log(statusMessage(MessageType.ERROR, "存在多个编译配置: "));
      compilerConfigFile.forEach((file) => {
        console.log(` FILE: ${file}`);
      });
      process.exit(1);
    }
    const configFile = compilerConfigFile[0],
      jsonCode = readFileSync(configFile, { encoding: "utf8" });
    return JSON.parse(jsonCode);
  }

  /**
   * @description 增强配置项，向基础配置中加入ui组件文档编译的特定配置
   * @author liu wei
   * @date 2020-07-13
   * @private
   * @param {RunnersOption[]} options
   * @returns
   * @memberof UiGulpManager
   */
  private enhanceRunnersOptions(options: RunnersOption[]) {
    const gulpfile = join(__dirname, "gulpfile.js");
    // 找到的编译文件地址，有多个或者没有找到的时候中断cli
    const compilerConfig = this.findCompilerConfig([
      ".compiler",
      "compiler.json",
    ]);
    const gulpfileOption = new RunnersOption("gulpfile", gulpfile);
    return Object.entries(compilerConfig).reduce((a, b) => {
      a.push(new RunnersOption(b[0], b[1]));
      return a;
    }, options.concat([gulpfileOption]));
  }

  public async execute(options: RunnersOption[]) {
    const loading = runnerLoading("组件文档编译");
    const enhanceRunnersOptions = this.enhanceRunnersOptions(options);
    loading.start();
    const message = await super.execute(enhanceRunnersOptions);
    loading.stop();
    return message;
  }
}
