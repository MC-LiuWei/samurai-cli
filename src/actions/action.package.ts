/*
 * @Author: 刘伟
 * @Date: 2020-06-11 16:58:08
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 14:05:34
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/actions/action.package.ts
 */
import { execSync } from "child_process";
import { AbstractAction } from ".";
import { Input } from "../commands";
import message from "../common/ui/message";
import { runnerLoading } from "../common/ui/loading";

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
      const loading = runnerLoading("package版本检查");
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
        console.log(message.packageVersionError(versions.pop() as string));
        process.exit(1);
      } else {
        console.log(message.packageVersionSuccess);
        process.exit(0);
      }
    }
  }
}
