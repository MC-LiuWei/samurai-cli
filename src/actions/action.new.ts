import { AbstractAction } from "./abstract.action";
import { Input } from "../commands/command.input";
import { IExamples } from "../examples/interface";

export default class NewAction extends AbstractAction {

  public async handle(name: Input, options: Input[]) {
    const application: IExamples = name.value;
    const isSrr = options.find((item) => item.name === 'server')?.value;
    const _name = options.find((item) => item.name === 'name')?.value;
    const path = options.find((item) => item.name === 'path')?.value;
    application.generate(path, _name, { server: isSrr });
  }
}