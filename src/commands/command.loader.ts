import { AbstractCommand } from './abstract.command';
import { CommanderStatic } from 'commander';
import CreateCommand from './command.create';
import GenerateCommand from './command.generate';
import CreateAction from '../actions/action.create';
import GenerateAction from '../actions/action.generate';

export class CommandLoader {
    public static load(program: CommanderStatic): void {
        new CreateCommand(new CreateAction()).load(program);
        new GenerateCommand(new GenerateAction()).load(program);
    }

    private static handleInvalidCommand(program: CommanderStatic) {
        program.on('command:*', () => {
            process.exit(1);
        })
    }
}