/*
 * @Author: 刘伟
 * @Date: 2020-06-13 13:44:02
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 13:36:05
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/runners/abstract.runner.ts
 */
import { ChildProcess, spawn, SpawnOptions } from "child_process";
import { resolve } from "dns";
import { rejects } from "assert";
export class AbstractRunner {
  constructor(protected binary: string) {}

  private transformCommandMessage(message: string) {
    return message.replace(/\r\n|\n/, "");
  }

  public async run(
    command: string,
    collect = false,
    cwd: string = process.cwd()
  ) {
    const args: string[] = [command];
    const options: SpawnOptions = {
      cwd,
      stdio: collect ? "pipe" : "inherit",
      shell: true,
    };
    return new Promise<null | string>((resolve, rejects) => {
      const child: ChildProcess = spawn(`${this.binary}`, args, options);
      if (collect) {
        child.stdout!.on("data", (data) =>
          resolve(this.transformCommandMessage(data.toString()))
        );
      }
      child.on("close", (code) => {
        switch (code) {
          case 0:
            resolve(null);
            break;
          case 1:
            rejects();
          default:
            resolve(null);
            break;
        }
      });
    });
  }
}
