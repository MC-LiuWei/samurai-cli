import { AbstractAction } from "./abstract.action";
import { Input } from "../commands/command.input";
import { IExamples } from '../examples/interface';

export default class GenerateAction extends AbstractAction {

  public async handle(name: Input, options: Input[]) {
    const examples: IExamples = name.value;
    const paths = options.find((item) => item.name === 'path')?.value;
    const fileName = options.find((item) => item.name === 'name')?.value;
    examples.generate(paths, fileName);
  }
}