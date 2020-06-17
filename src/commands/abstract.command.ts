/*
 * @Author: 刘伟
 * @Date: 2020-03-10 15:20:40
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-11 16:55:42
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/commands/abstract.command.ts
 */

import { AbstractAction } from "../actions/abstract.action";
import { CommanderStatic } from "commander";

export abstract class AbstractCommand {
  constructor(protected action: AbstractAction) {}

  public abstract load(program: CommanderStatic): void;
}
