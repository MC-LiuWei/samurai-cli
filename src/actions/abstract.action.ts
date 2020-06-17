/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-06-13 17:07:57
 * @LastEditors: 刘伟
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/actions/abstract.action.ts
 */
import { Input } from "../commands";

export abstract class AbstractAction {
  public abstract async handle(
    inputs: Input[],
    options: Input[]
  ): Promise<void>;
}
