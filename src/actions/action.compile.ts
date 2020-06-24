/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:44:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 09:50:42
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/actions/action.compile.ts
 */
import { AbstractAction } from ".";
import { Input } from "../commands";
import { CompilersFactory, Compiler } from "../common/compilers";
import { RunnersOption } from "../common/runners";

export class CompileAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await compilePackageFiles(inputs.concat(options));
  }
}

async function compilePackageFiles(inputs: Input[]) {
  const compilerTask = inputs.find((input) => input.name == "task")
    ?.value as string;
  const options = mapRunnersOption(inputs);
  const compiler = CompilersFactory.create(compilerTask);
  compiler?.execute(options);
}

const mapRunnersOption = (inputs: Input[]): RunnersOption[] => {
  const excludedInputNames = ["task"];
  const options: RunnersOption[] = [];
  inputs.forEach((input) => {
    if (!excludedInputNames.includes(input.name) && input.value !== undefined) {
      options.push(new RunnersOption(input.name, input.value));
    }
  });
  return options;
};
