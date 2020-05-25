/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-04-11 19:46:36
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
    program.command('new [name]')
      .alias('n')
      .description('create samurai app')
      .option('--dir [directory]', 'Specify the destination directory')
      .option('-p, --package-manager [package-manager]', 'Package management tool')
      .option(
        '-c, --collection [collectionName]',
        'Schematics collection to use.',
      )
      .action(async (
        name: string,
        command: Command
      ) => {
        const options: Input[] = [];
        const inputs: Input[] = [];
        options.push({
          name: 'package-manager',
          value: command.packageManager,
        });
        options.push({ name: 'directory', value: command.directory });
        inputs.push({ name: 'name', value: name });
        await this.action.handle(inputs, options);
      })
  }
}