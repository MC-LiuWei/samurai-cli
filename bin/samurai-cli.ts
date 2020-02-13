#!/usr/bin/env node
import commander, { CommanderStatic } from 'commander';
import { CommandLoader } from '../src/commands/command.loader';



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