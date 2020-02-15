import { AbstractAction } from "./abstract.action";
import { Input } from "../commands/command.input";
import { IExamples } from '../examples/interface';

export default class GenerateAction extends AbstractAction {

  public async handle(name: Input, options: Input[]) {
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