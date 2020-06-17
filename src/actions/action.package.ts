/*
 * @Author: 刘伟
 * @Date: 2020-06-11 16:58:08
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 17:08:11
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/actions/action.package.ts
 */
// import inquirer, { Answers, Question } from "inquirer";
import ora from "ora";
import { execSync } from "child_process";
import { AbstractAction } from ".";
import { Input } from "../commands";
import message from "../common/ui/message";

export class PackageAction extends AbstractAction {
  /**
   * @description 获取包的版本信息
   * @author liu wei
   * @date 2020-06-11
   * @private
   * @param {string} pkgName
   * @returns
   * @memberof PackageAction
   */
  private getVersion(pkgName: string): string[] {
    try {
      const loading = ora({
        spinner: {
          interval: 10,
          frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
        },
        text: "Check version...",
      });
      loading.start();
      const versions = execSync(
        `npm view ${pkgName} versions --json`
      ).toString();
      loading.stop();
      return JSON.parse(versions);
    } catch (error) {
      return [];
    }
  }

  public async handle(inputs: Input[], options: Input[]) {
    const packageInfo = inputs.find((inp) => inp.name == "packageInfo"),
      checkVersion = options.find((inp) => inp.name == "checkVersion");
    if (checkVersion) {
      const versions = this.getVersion(packageInfo?.value.name);
      if (versions.find((ver) => ver == packageInfo?.value.version)) {
        console.log(message.packageVersionError);
        process.exit(1);
      }
    }
  }
}
