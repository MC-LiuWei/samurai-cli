/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-04-09 13:19:34
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/actions/action.generate.ts
 */
import { AbstractAction } from "./abstract.action";
import { Input } from "../commands/command.input";
import { IExamples } from '../examples/interface';

export default class GenerateAction extends AbstractAction {

  public async handle(inputs: Input[], options: Input[]) {
    const examples: IExamples = name.value;
    const params: any = {};
    const paths = options.find((item) => item.name === 'path')?.value;
    const fileName = options.find((item) => item.name === 'name')?.value;
    const isServer = options.find((item) => item.name === 'server')?.value;
    if (examples.config.alias === "con" && isServer) {
      params['server'] = isServer;
    }
    examples.generate(paths, fileName, params);
  }
}