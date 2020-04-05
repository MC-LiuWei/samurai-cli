"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = require("shelljs");
var chalk_1 = require("chalk");
var path_1 = require("path");
var fs_1 = require("fs");
var utils_1 = require("../../../utils/utils");
function generate(path, fileName, options) {
    return __awaiter(this, void 0, void 0, function () {
        var ext, _filename, name, pathname, stylespath, filename, indexFile, styleFile, indexStyleFile, componentCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ext = path_1.extname(fileName);
                    _filename = fileName.split(".");
                    name = _filename.shift();
                    pathname = !!ext ? path : path_1.join(path, utils_1.toUpperCase(name));
                    stylespath = path_1.join(pathname, 'styles');
                    filename = !!ext ? utils_1.toUpperCase(fileName) : utils_1.toUpperCase(name) + ".tsx";
                    indexFile = path_1.join(pathname, 'index.tsx');
                    styleFile = path_1.join(stylespath, utils_1.toUpperCase(name) + ".styles.ts");
                    indexStyleFile = path_1.join(stylespath, "index.ts");
                    componentCode = outComponentFuncCode(utils_1.toUpperCase(name));
                    shelljs_1.mkdir('-p', pathname);
                    console.log(chalk_1.greenBright('[CREATE DIR]: '), chalk_1.whiteBright(pathname));
                    shelljs_1.mkdir('-p', stylespath);
                    console.log(chalk_1.greenBright('[CREATE DIR]: '), chalk_1.whiteBright(stylespath));
                    return [4 /*yield*/, fs_1.writeFileSync(path_1.join(pathname, filename), componentCode, { encoding: "utf8" })];
                case 1:
                    _a.sent();
                    console.log(chalk_1.greenBright('[CREATE COMPONENT FILE]: '), chalk_1.whiteBright(path_1.join(pathname, filename)));
                    return [4 /*yield*/, shelljs_1.touch(styleFile)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, updateEntrance(indexFile, utils_1.toUpperCase(name))];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, updateStylesEntrance(indexStyleFile, utils_1.toUpperCase(name))];
                case 4:
                    _a.sent();
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = generate;
function updateEntrance(path, componentName) {
    return __awaiter(this, void 0, void 0, function () {
        var insertCode, entranceFileCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs_1.existsSync(path)) {
                        shelljs_1.touch(path);
                    }
                    insertCode = "export { default as " + componentName + " } from './" + componentName + "';";
                    return [4 /*yield*/, fs_1.readFileSync(path, { encoding: "utf-8" })];
                case 1:
                    entranceFileCode = _a.sent();
                    entranceFileCode = entranceFileCode + "\r" + insertCode;
                    return [4 /*yield*/, fs_1.writeFileSync(path, entranceFileCode, { encoding: "utf-8" })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function updateStylesEntrance(path, styleName) {
    return __awaiter(this, void 0, void 0, function () {
        var insertCode, entranceFileCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs_1.existsSync(path)) {
                        shelljs_1.touch(path);
                    }
                    insertCode = "export { default as " + styleName + "Style } from './" + styleName + ".styles.ts';";
                    return [4 /*yield*/, fs_1.readFileSync(path, { encoding: "utf-8" })];
                case 1:
                    entranceFileCode = _a.sent();
                    entranceFileCode = entranceFileCode + "\r" + insertCode;
                    return [4 /*yield*/, fs_1.writeFileSync(path, entranceFileCode, { encoding: 'utf-8' })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function outComponentFuncCode(name) {
    var interfaceName = "I" + name + "Props ";
    return "\n        import React, { useState } from 'react';\n        import PropTypes from 'prop-types';\n\n        interface " + interfaceName + " {}\n        function " + name + "(props: " + interfaceName + ") {\n            return (\n                <div>Hello, " + name + "</div>\n            );\n        }\n\n        " + name + ".defaultProp = {};\n        " + name + ".propTypes = {};\n        export default " + name + "\n    ";
}
function outComponentClassCode(name) {
    var interfaceProps = "I" + name + "Props";
    var interfaceState = "I" + name + "State";
    return "\n        import React, { Component } from 'react';\n        import PropTypes from 'prop-types';\n\n        interface " + interfaceProps + " {}\n        class " + name + " extends Component<" + interfaceProps + "," + interfaceState + ", any> {\n            constructor(props: " + interfaceProps + ", content: any) {\n                this.state = {},\n            }\n            render(){\n                return (\n                    <div>Hello," + name + "</div>\n                )\n            }\n        }\n\n        " + name + ".defaultProp = {};\n        " + name + ".propTypes = {};\n        export default " + name + ";\n    ";
}
