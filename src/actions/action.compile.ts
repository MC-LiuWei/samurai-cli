/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:44:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 19:13:27
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/actions/action.compile.ts
 */
import { readFileSync, existsSync } from "fs";
import { AbstractAction } from ".";
import { Input } from "../commands";
import { CompilersFactory, Compiler } from "../common/compilers";
import { RunnersOption } from "../common/runners";
import message from "../common/ui/message";
import { ConfigFile } from "../common/interface";

export class CompileAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await compilePackageFiles(inputs.concat(options));
  }
}

async function compilePackageFiles(inputs: Input[]) {
  // const compilerTask = inputs.find((input) => input.name == "task")
  // const compilerJsonFilePath = inputs.find((input) => input.name == "config")
  const config = conversionCompilerConfig(inputs);
  const options = mapRunnersOption(inputs);
  const compiler = CompilersFactory.create(config.schematic);
  compiler?.execute(options);
}

const conversionCompilerConfig = (inputs: Input[]): ConfigFile => {
  const filePath = inputs.find((input) => input.name == "config")
    ?.value as string;
  if (existsSync(filePath)) {
    const jsonCode = readFileSync(filePath, { encoding: "utf8" });
    return JSON.parse(jsonCode);
  } else {
    console.log(message.notFileError("samurai.json"));
    process.exit(1);
  }
};

const mapRunnersOption = (inputs: Input[]): RunnersOption[] => {
  const excludedInputNames = ["task", "config"];
  const options: RunnersOption[] = [];
  inputs.forEach((input) => {
    if (!excludedInputNames.includes(input.name) && input.value !== undefined) {
      options.push(new RunnersOption(input.name, input.value));
    }
  });
  return options;
};
