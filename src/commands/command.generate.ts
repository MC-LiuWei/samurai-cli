import Table from 'cli-table3';
import { join } from 'path';
import { AbstractCommand } from './abstract.command';
import { CommanderStatic, Command, Option } from 'commander';
import { Input } from './command.input';
import examples from '../examples';

export default class GenerateCommand extends AbstractCommand {
  public load(program: CommanderStatic) {
    program.command('generate <schematic> <name> [path]')
      .alias('g')
      .description(this.buildDesc())
      .option('-d, --dry-run', 'Report actions that would be taken without writing out results.')
      .action(async (
        schematic,
        name,
        path,
        command,
      ) => {
        let paths: any = name.split('/');
        const _schematic = examples.find((item) => item.config.name == schematic || item.config.alias == schematic);
        const options: Input[] = [];
        const cwd = process.cwd();
        const fileName = paths.pop();
        paths = paths.join("/");
        options.push({ name: 'name', value: fileName });
        options.push({ name: 'path', value: !!path ? join(cwd, path, paths) : join(cwd, paths) });
        options.push({ name: 'dryRun', value: !!command.dryRun })
        await this.action.handle({ name: 'examples', value: _schematic }, options);
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

    for (const schematic of examples) {
      table.push([schematic.config.name, schematic.config.alias]);
    }
    return table.toString();
  }
}