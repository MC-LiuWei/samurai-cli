import { AbstractCommand } from './abstract.command';
import { CommanderStatic } from 'commander';
import { red } from 'chalk';
import GenerateCommand from './command.generate';
import GenerateAction from '../actions/action.generate';

export class CommandLoader {
    public static load(program: CommanderStatic): void {
        new GenerateCommand(new GenerateAction()).load(program);
    }

    private static handleInvalidCommand(program: CommanderStatic) {
        program.on('command:*', () => {
            console.error(
                `\nInvalid command: ${red('%s')}`,
                program.args.join(' '),
            );
            console.log(
                `See ${red('--help')} for a list of available commands.\n`,
            );
            process.exit(1);
        });
    }
}