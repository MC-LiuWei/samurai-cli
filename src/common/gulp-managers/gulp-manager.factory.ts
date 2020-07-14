/*
 * @Author: 刘伟
 * @Date: 2020-07-04 18:27:45
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-14 22:45:20
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/gulp-manager.factory.ts
 */
import { Gulp, UiGulpManager } from ".";
import { RunnerFactory, Runner, GulpRunner } from "../runners";

export class GulpManagerFactory {
  public static create(compiler: Gulp | string) {
    switch (compiler) {
      case Gulp.UI:
        return new UiGulpManager(
          RunnerFactory.create(Runner.GULP) as GulpRunner
        );
        break;
      default:
        break;
    }
  }
}
