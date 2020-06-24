/*
 * @Author: 刘伟
 * @Date: 2020-06-13 14:22:15
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-22 13:15:40
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/runners/runner.factory.ts
 */
import message from "../ui/message";
import { GulpRunner, SchematicRunner, Runner } from ".";

export class RunnerFactory {
  public static create(runner: Runner) {
    switch (runner) {
      case Runner.SCHEMATIC:
        return new SchematicRunner();
      case Runner.GULP:
        return new GulpRunner();
      default:
        console.info(message.runnerFactoryError(runner));
    }
  }
}
