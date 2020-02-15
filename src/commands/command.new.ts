import Table from 'cli-table3';
import { join } from 'path';
import { AbstractCommand } from './abstract.command';
import { CommanderStatic, Command, Option } from 'commander';
import { Input } from './command.input';
import applications from '../examples/applications';

export default class NewCommand extends AbstractCommand {

  public load(program: CommanderStatic) {
    program.command('new <schematic> <name>')
      .alias('n')
      .description(this.buildDesc())
      .option('-s, --server', 'Is server render')
      .action(async (
        schematic,
        name,
        command
      ) => {
        const project = process.cwd();
        const application = applications.find((item) => item.config.name === schematic || item.config.alias === schematic);
        const options: Input[] = [];
        options.push({ name: 'server', value: !!command.server });
        options.push({ name: 'name', value: name });
        options.push({ name: 'path', value: project });

        await this.action.handle({ name: 'application', value: application }, options);
      })
  }

  private buildDesc(): string {
    return (
      'Generate a Nest element.\n' +
      '  Available schematics:\n' +
      this.buildSchematicsListAsTable()
    )
  }

  private buildSchematicsListAsTable(): string {
    const leftMargin = '    ';
    const tableConfig = {
      head: ['name', 'alias'],
      chars: {
        'left': leftMargin.concat('│'),
        'top-left': leftMargin.concat('┌'),
        'bottom-left': leftMargin.concat('└'),
        'mid': '',
        'left-mid': '',
        'mid-mid': '',
        'right-mid': '',
      },
    };
    const table: any = new Table(tableConfig);

    for (const schematic of applications) {
      table.push([schematic.config.name, schematic.config.alias]);
    }
    return table.toString();
  }
}