#!/usr/bin/env node
import commander, { CommanderStatic } from "commander";
import { CommandLoader } from "../commands";

function main() {
  const program: CommanderStatic = commander;
  program
    .version(
      require("../../package.json").version,
      "-v, --version",
      "Output the current version."
    )
    .usage("<command>")
    .helpOption("-h, --help", "Output usage information.");

  CommandLoader.load(program);
  commander.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
  }
}

main();
