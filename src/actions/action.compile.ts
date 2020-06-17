/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:44:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-17 20:07:19
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/actions/action.compile.ts
 */
import { AbstractAction } from ".";
import { Input } from "../commands";

export class CompileAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    const task = inputs.find((input) => input.name == "task");
  }
}
