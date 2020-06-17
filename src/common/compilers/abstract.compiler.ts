/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:49:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-17 20:00:37
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/abstract.compiler.ts
 */
import { AbstractRunner } from "../runners/abstract.runner";

export class AbstractCompiler {
  constructor(protected runner: AbstractRunner) {}

  public async compiler(
    name: string,
    // options: SchematicOption[],
    extraFlags?: string
  ) {}
}
