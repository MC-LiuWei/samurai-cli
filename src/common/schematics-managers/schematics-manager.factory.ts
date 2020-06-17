/*
 * @Author: 刘伟
 * @Date: 2020-06-13 14:13:50
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 14:49:15
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/schematics-managers/schematics-manager.factory.ts
 */

import { Schematics } from "./schematics";
import { AbstractSchematicsManager } from "./abstract.schematics-manager";
import { SamuraiSchematicsManager } from "./samurai.schematics-manager";
import { RunnerFactory } from "../runners";
import { Runner } from "../runners";
import { SchematicRunner } from "../runners";
import { CustomSchematicsManager } from "./custom.schematics-manager";

export class SchematicsManagerFactory {
  public static create(
    schematics: Schematics | string
  ): AbstractSchematicsManager {
    switch (schematics) {
      case Schematics.SAMURAI:
        return new SamuraiSchematicsManager(
          RunnerFactory.create(Runner.SCHEMATIC) as SchematicRunner
        );
        break;
      default:
        return new CustomSchematicsManager(
          schematics,
          RunnerFactory.create(Runner.SCHEMATIC) as SchematicRunner
        );
        break;
    }
  }
}
