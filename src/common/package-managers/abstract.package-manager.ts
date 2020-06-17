/*
 * @Author: 刘伟
 * @Date: 2020-06-13 12:00:36
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 14:47:31
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/package-managers/abstract.package-manager.ts
 */

import { AbstractRunner } from "../runners/abstract.runner";

export abstract class AbstractPackageManager {
  constructor(protected runner: AbstractRunner) {}

  public async checkVersion() {}
}
