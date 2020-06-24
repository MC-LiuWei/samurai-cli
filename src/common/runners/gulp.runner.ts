/*
 * @Author: 刘伟
 * @Date: 2020-06-19 18:00:43
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-19 18:01:13
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/runners/gulp.runner.ts
 */
import { existsSync } from "fs";
import { join, resolve } from "path";
import { AbstractRunner } from "./abstract.runner";

export class GulpRunner extends AbstractRunner {
  constructor() {
    super(`"${GulpRunner.findClosestSchematicsBinary()}"`);
  }

  public static getModulePaths() {
    return module.paths;
  }

  public static findClosestSchematicsBinary(): string {
    const subPath = join(".bin", "gulp");
    for (const path of this.getModulePaths()) {
      const binaryPath = resolve(path, subPath);
      if (existsSync(binaryPath)) {
        return binaryPath;
      }
    }

    throw new Error("'schematics' binary path could not be found!");
  }
}
