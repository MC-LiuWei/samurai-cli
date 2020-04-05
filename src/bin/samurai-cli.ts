/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-04-05 20:12:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/bin/samurai-cli.ts
 */
import commander, { CommanderStatic } from 'commander';
import { CommandLoader } from '../commands/command.loader';



function main() {
    const program: CommanderStatic = commander;

    program.version(require("../package.json").version, '-v, --version',
        'Output the current version.')
        .usage('<command>')
        .helpOption('-h, --help', 'Output usage information.');

    CommandLoader.load(program);
    commander.parse(process.argv);
    if (!program.args.length) {
        program.outputHelp();
        process.exit(1);
    }
}

main();