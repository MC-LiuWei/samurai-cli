/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-04-05 21:07:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/actions/action.new.ts
 */
import { AbstractAction } from "./abstract.action";
import { Input } from "../commands/command.input";
import { IExamples } from "../examples/interface";
import { generate } from '../examples/applications';

export default class NewAction extends AbstractAction {

  public async handle(app: Input, options: Input[]) {
    const name = app.name;
    const path = options.find((item) => item.name === 'path');
    if (!path) process.exit(1);
    generate(name, path.name);
  }
}