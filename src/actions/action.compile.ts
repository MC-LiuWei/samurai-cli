/*
 * @Author: 刘伟
 * @Date: 2020-06-17 19:44:34
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-18 00:02:34
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/actions/action.compile.ts
 */
import { AbstractAction } from ".";
import { Input } from "../commands";
import { CompilersOptions } from "../common/compilers";

export class CompileAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await compilePackageFiles(inputs.concat(options));
  }
}

async function compilePackageFiles(inputs: Input[]) {}

const mapCompilersOptions = (inputs: Input[]): CompilersOptions[] => {
  const excludedInputNames = ["task", "collection"];
};
