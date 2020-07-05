/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:44:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-05 00:53:09
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/actions/action.compile.ts
 */
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { AbstractAction } from ".";
import { Input } from "../commands";
import { GulpManagerFactory, Gulp } from "../common/gulp-managers";
import { RunnersOption } from "../common/runners";
import message from "../common/ui/message";
import { ConfigFile } from "../common/options/interface";

export class CompileAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await compilePackageFiles(inputs.concat(options));
  }
}

async function compilePackageFiles(inputs: Input[]) {
  const config = conversionCompilerConfig(inputs);
  const options = mapRunnersOption(inputs).concat(
    mapConfigRunnerOptions(config)
  );
  const compiler = GulpManagerFactory.create(config.schematic);
  compiler?.execute(options);
}

const conversionCompilerConfig = (inputs: Input[]): ConfigFile => {
  const fileName = inputs.find((input) => input.name == "config")
    ?.value as string;
  const filePath = join(process.cwd(), fileName);
  if (existsSync(filePath)) {
    const jsonCode = readFileSync(filePath, { encoding: "utf8" });
    return JSON.parse(jsonCode);
  } else {
    console.log(message.notFileError(fileName));
    process.exit(1);
  }
};

const mapConfigRunnerOptions = (config: object = {}): RunnersOption[] => {
  const excludedInputNames = ["schematic", "packageManager"];
  const entries = Object.entries(config);
  const options: RunnersOption[] = [];
  entries.forEach((etr) => {
    if (!excludedInputNames.includes(etr[0]) && etr[1] !== undefined) {
      options.push(new RunnersOption(etr[0], etr[1]));
    }
  });
  return options;
};

const mapRunnersOption = (inputs: Input[]): RunnersOption[] => {
  const excludedInputNames = ["config"];
  const options: RunnersOption[] = [];
  inputs.forEach((input) => {
    if (!excludedInputNames.includes(input.name) && input.value !== undefined) {
      options.push(new RunnersOption(input.name, input.value));
    }
  });
  return options;
};
