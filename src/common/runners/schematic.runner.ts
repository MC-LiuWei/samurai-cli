/*
 * @Author: 刘伟
 * @Date: 2020-06-13 14:19:42
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 23:55:43
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/runners/schematic.runner.ts
 */
import { existsSync } from "fs";
import { join, resolve } from "path";
import { AbstractRunner } from "./abstract.runner";

export class SchematicRunner extends AbstractRunner {
  constructor() {
    super(`"${SchematicRunner.findClosestSchematicsBinary()}"`);
  }

  public static getModulePaths() {
    return module.paths;
  }

  public static findClosestSchematicsBinary(): string {
    const subPath = join(".bin", "schematics");
    for (const path of this.getModulePaths()) {
      const binaryPath = resolve(path, subPath);
      if (existsSync(binaryPath)) {
        return binaryPath;
      }
    }

    throw new Error("'schematics' binary path could not be found!");
  }
}
