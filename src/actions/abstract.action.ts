/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-04-09 11:58:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/actions/abstract.action.ts
 */
import { Input } from "../commands/command.input";


export abstract class AbstractAction {
    public abstract async handle(inputs: Input[], options: Input[]): Promise<void>
}