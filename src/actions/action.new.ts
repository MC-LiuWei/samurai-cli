/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-05-25 16:27:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/actions/action.new.ts
 */
import inquirer, { Answers, Question } from 'inquirer';
import { AbstractAction } from "./abstract.action";
import { Input } from "../commands/command.input";
import { generateInput } from '../utils';
import { IExamples } from "../examples/interface";
import { generate } from '../examples/applications';

export default class NewAction extends AbstractAction {

  private perfectNameInformation = async (inputs: Input[]) => {
    const prompt: inquirer.PromptModule = inquirer.createPromptModule();
    const nameParams = this.getApplicationNameInput(inputs);
    if (!nameParams!.value) {
      const message = 'What name would you like to use for the new project?';
      const questions = [generateInput('name', message)('nest-app')];
      const answers: Answers = await prompt(questions as ReadonlyArray<Question>);
      this.replaceInputMissingInformation(inputs, answers);
    }
  }

  private replaceInputMissingInformation = (inputs: Input[], answers: Answers): Input[] => {
    return inputs.map(input => (input.value = input.value !== undefined ? input.value : answers[input.name]));
  }

  private getApplicationNameInput = (inputs: Input[]) =>
    inputs.find(input => input.name === 'name');

  public async handle(inputs: Input[], options: Input[]) {
    const directoryOption = options.find(option => option.name === 'directory');
    await this.perfectNameInformation(inputs);
  }
}