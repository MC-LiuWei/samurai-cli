/*
 * @Author: 刘伟
 * @Date: 2020-06-13 14:22:15
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 14:42:36
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/runners/runner.factory.ts
 */
import { Runner } from "./runner";
import { SchematicRunner } from "./schematic.runner";
import message from "../ui/message";

export class RunnerFactory {
  public static create(runner: Runner) {
    switch (runner) {
      case Runner.SCHEMATIC:
        return new SchematicRunner();
      default:
        console.info(message.runnerFactoryError(runner));
    }
  }
}
