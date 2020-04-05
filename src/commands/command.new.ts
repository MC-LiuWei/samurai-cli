/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-04-05 21:06:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/commands/command.new.ts
 */
import Table from 'cli-table3';
import { join } from 'path';
import { AbstractCommand } from './abstract.command';
import { CommanderStatic, Command, Option } from 'commander';
import { Input } from './command.input';

export default class NewCommand extends AbstractCommand {

  public load(program: CommanderStatic) {
    program.command('new <name>')
      .alias('n')
      .description('create samurai app')
      .option('-s, --server', 'Is server render')
      .action(async (
        name,
        command
      ) => {
        const project = process.cwd();
        const options: Input[] = [];
        options.push({ name: 'path', value: join(project, name) });

        await this.action.handle({ name: 'name', value: name }, options);
      })
  }
}