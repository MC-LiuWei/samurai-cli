"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cli_table3_1 = __importDefault(require("cli-table3"));
var path_1 = require("path");
var abstract_command_1 = require("./abstract.command");
var components_1 = __importDefault(require("../examples/components"));
var GenerateCommand = /** @class */ (function (_super) {
    __extends(GenerateCommand, _super);
    function GenerateCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenerateCommand.prototype.load = function (program) {
        var _this = this;
        program.command('generate <schematic> <name> [path]')
            .alias('g')
            .description(this.buildDesc())
            .option('-d, --dry-run', 'Report actions that would be taken without writing out results.')
            .option('-s, --server', 'Is Server')
            .action(function (schematic, name, path, command) { return __awaiter(_this, void 0, void 0, function () {
            var paths, _schematic, options, cwd, fileName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        paths = name.split('/');
                        _schematic = components_1.default.find(function (item) { return item.config.name == schematic || item.config.alias == schematic; });
                        options = [];
                        cwd = process.cwd();
                        fileName = paths.pop();
                        paths = paths.join("/");
                        options.push({ name: 'name', value: fileName });
                        options.push({ name: 'path', value: !!path ? path_1.join(cwd, path, paths) : path_1.join(cwd, paths) });
                        options.push({ name: 'dryRun', value: !!command.dryRun });
                        options.push({ name: 'server', value: !!command.server });
                        return [4 /*yield*/, this.action.handle({ name: 'examples', value: _schematic }, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    GenerateCommand.prototype.buildDesc = function () {
        return ('Generate a Nest element.\n' +
            '  Available schematics:\n' +
            this.buildSchematicsListAsTable());
    };
    GenerateCommand.prototype.buildSchematicsListAsTable = function () {
        var leftMargin = '    ';
        var tableConfig = {
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
        var table = new cli_table3_1.default(tableConfig);
        for (var _i = 0, examples_1 = components_1.default; _i < examples_1.length; _i++) {
            var schematic = examples_1[_i];
            table.push([schematic.config.name, schematic.config.alias]);
        }
        return table.toString();
    };
    return GenerateCommand;
}(abstract_command_1.AbstractCommand));
exports.default = GenerateCommand;
