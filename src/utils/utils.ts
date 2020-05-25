/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-04-11 19:58:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/utils/utils.ts
 */
import {Question} from 'inquirer';

export function toUpperCase(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

export function generateInput(name: string, message: string) {
  return (defaultAnswer: string): Question => ({
    type: 'input',
    name,
    message,
    default: defaultAnswer
  });
}