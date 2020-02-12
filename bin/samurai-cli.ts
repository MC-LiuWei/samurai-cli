#!/usr/bin/env node
import commander, { CommanderStatic } from 'commander';
import { CommandLoader } from '../src/commands/command.loader';



function main() {
    const program: CommanderStatic = commander;

    program.version(require("../package.json").version)
        .usage('<command>');
    CommandLoader.load(program);
    commander.parse(process.argv);
    if (!program.args.length) {
        program.outputHelp();
    }
}

main();