/*
 * @Author: 刘伟
 * @Date: 2020-06-13 14:07:24
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-22 13:14:53
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/schematics-managers/samurai.schematics-manager.ts
 */

import { AbstractRunner } from "../runners";
import { AbstractSchematicsManager } from "./abstract.schematics-manager";
import { RunnersOption } from "../runners";

export interface Schematic {
  name: string;
  alias: string;
}

export class SamuraiSchematicsManager extends AbstractSchematicsManager {
  private static schematics: Schematic[] = [{ name: "ui", alias: "ui" }];

  constructor(runner: AbstractRunner) {
    super("samurai-schematic", runner);
  }

  public async execute(name: string, options: RunnersOption[]) {
    const schematic: string = this.validate(name);
    await super.execute(schematic, options);
  }

  public static getSchematics(): Schematic[] {
    return SamuraiSchematicsManager.schematics;
  }

  private validate(name: string) {
    const schematic = SamuraiSchematicsManager.schematics.find(
      (s) => s.name === name || s.alias === name
    );

    if (schematic === undefined || schematic === null) {
      throw new Error(
        `Invalid schematic "${name}". Please, ensure that "${name}" exists in this schematics-manager.`
      );
    }
    return schematic.name;
  }
}
