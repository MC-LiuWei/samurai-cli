/*
 * @Author: your name
 * @Date: 2020-04-06 17:39:02
 * @LastEditTime: 2020-04-07 10:21:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/commons/messages/index.ts
 */
import * as chalk from 'chalk';
import { EMOJIS } from './emoji';

export const MESSAGES = {
  PROJECT_SELECTION_QUESTION: 'Which project would you like to generate to?',
  LIBRARY_PROJECT_SELECTION_QUESTION:
    'Which project would you like to add the library to?',
  DRY_RUN_MODE: 'Command has been executed in dry run mode, nothing changed!',
  PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: `Installation in progress... ${EMOJIS.coffee}`,
};