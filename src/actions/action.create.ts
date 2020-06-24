/*
 * @Author: 刘伟
 * @Date: 2020-06-13 17:33:16
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-22 13:13:41
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/actions/action.create.ts
 */
import { AbstractAction } from ".";
import { Input } from "../commands";
import message from "../common/ui/message";
import {
  AbstractSchematicsManager,
  SchematicsManagerFactory,
} from "../common/schematics-managers";
import { RunnersOption } from "../common/runners";

export class CreateAction extends AbstractAction {
  public async handle(inputs: Input[], options: Input[]) {
    await generatePackageFiles(inputs.concat(options));
  }
}

async function generatePackageFiles(inputs: Input[]) {
  const collectionOption = inputs.find((option) => option.name == "collection")!
    .value as string;
  const collection: AbstractSchematicsManager = SchematicsManagerFactory.create(
    collectionOption
  );
  const RunnersOptions: RunnersOption[] = mapRunnersOptions(inputs);
  try {
    const schematicInput = inputs.find((input) => input.name === "schematic");
    if (!schematicInput) {
      throw new Error("Unable to find a schematic for this configuration");
    }
    await collection.execute(schematicInput.value as string, RunnersOptions);
  } catch (error) {
    if (error && error.message) {
      //   console.error(chalk.red(error.message));
    }
  }
}

const mapRunnersOptions = (inputs: Input[]): RunnersOption[] => {
  const excludedInputNames = ["schematic", "collection"];
  const options: RunnersOption[] = [];
  inputs.forEach((input) => {
    if (!excludedInputNames.includes(input.name) && input.value !== undefined) {
      options.push(new RunnersOption(input.name, input.value));
    }
  });
  return options;
};
