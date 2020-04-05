"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var command_generate_1 = __importDefault(require("./command.generate"));
var action_generate_1 = __importDefault(require("../actions/action.generate"));
var command_new_1 = __importDefault(require("./command.new"));
var action_new_1 = __importDefault(require("../actions/action.new"));
var CommandLoader = /** @class */ (function () {
    function CommandLoader() {
    }
    CommandLoader.load = function (program) {
        new command_generate_1.default(new action_generate_1.default()).load(program);
        new command_new_1.default(new action_new_1.default()).load(program);
    };
    CommandLoader.handleInvalidCommand = function (program) {
        program.on('command:*', function () {
            console.error("\nInvalid command: " + chalk_1.red('%s'), program.args.join(' '));
            console.log("See " + chalk_1.red('--help') + " for a list of available commands.\n");
            process.exit(1);
        });
    };
    return CommandLoader;
}());
exports.CommandLoader = CommandLoader;
