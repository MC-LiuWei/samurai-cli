import { AbstractCommand } from './abstract.command';
import { CommanderStatic, Command, Option } from 'commander';
import { Input } from './command.input';

export default class CreateCommand extends AbstractCommand {

    public load(program: CommanderStatic) {
        program.command('create [app]')
            .alias('c')
            .description("create application")
            .option('-n, --name [name]', 'create application name')
            .option('-t, --typescript', 'is typescript')
            .option('-c, --class', 'is class component')
            .action(async (app: Command, command: Command) => {
                const params: Input[] = [];
                if (!command.name) {
                    console.log('--name is null');
                    process.exit(1);
                    return;
                }
                params.push({
                    name: "name",
                    value: command.name
                });
                params.push({
                    name: "ext",
                    value: command.typescript ? "tsx" : "jsx",
                });
                params.push({
                    name: "type",
                    value: command.class ? "Class" : "Func"
                })
                await this.action.handle({ name: "app", value: app }, params);
            })
    }
}