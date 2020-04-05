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
var path_1 = require("path");
var utils_1 = require("../../../utils/utils");
var shelljs_1 = require("shelljs");
var fs_1 = require("fs");
var DEFAULTACTIONTYPE = 'EXAMPLEACTIONTYPE';
function generate(path, name, options) {
    return __awaiter(this, void 0, void 0, function () {
        var names, modelName, pathName, containerCode, actionCode, sagaCode, reducerCode, selectorsCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    names = name.split("/");
                    modelName = names.pop();
                    pathName = path_1.join(path, names.join('/'));
                    shelljs_1.mkdir('-p', path_1.join(pathName, modelName));
                    containerCode = "export const " + DEFAULTACTIONTYPE + " = '" + DEFAULTACTIONTYPE + "'";
                    actionCode = createActionCode(modelName);
                    sagaCode = createSagaCode(modelName);
                    reducerCode = createReducerCode(modelName);
                    selectorsCode = createSelectorsCode(modelName);
                    return [4 /*yield*/, fs_1.writeFileSync(path_1.join(pathName, modelName, 'container.ts'), containerCode, { encoding: 'utf-8' })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, fs_1.writeFileSync(path_1.join(pathName, modelName, 'action.ts'), actionCode, { encoding: 'utf-8' })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, fs_1.writeFileSync(path_1.join(pathName, modelName, 'saga.ts'), sagaCode, { encoding: 'utf-8' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fs_1.writeFileSync(path_1.join(pathName, modelName, 'reducer.ts'), reducerCode, { encoding: 'utf-8' })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, fs_1.writeFileSync(path_1.join(pathName, modelName, 'selectors.ts'), selectorsCode, { encoding: 'utf-8' })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = generate;
function createSelectorsCode(name) {
    var _name = utils_1.toUpperCase(name);
    return "\n  import { createSelector } from 'reselect';\n  import { initialState, name } from './reducer';\n\n  export const select" + _name + "State = (state: any) => state[name] || initialState;\n  export const make" + _name + "Select = () => createSelector(select" + _name + "State, " + name + "State => " + name + "State);\n  ";
}
function createSagaCode(name) {
    var _name = utils_1.toUpperCase(name);
    return "\n    import { takeLatest } from 'redux-saga/effects';\n    import { " + DEFAULTACTIONTYPE + " } from './container';\n\n    export function* ExampleSaga() {\n\n    }\n\n    export default function* " + _name + "Saga() {\n      yield takeLatest(" + DEFAULTACTIONTYPE + ", ExampleSaga);\n    }\n  ";
}
function createActionCode(name) {
    var _name = utils_1.toUpperCase(name);
    return "\n    import { " + DEFAULTACTIONTYPE + " } from './container';\n    export function " + _name + "Action() {\n      return {\n        type: " + DEFAULTACTIONTYPE + "\n      }\n    }\n  ";
}
function createReducerCode(name) {
    var _name = utils_1.toUpperCase(name);
    return "\n    import produce from 'immer';\n\n    export interface I" + _name + "State {}\n\n    export const initialState:I" + _name + "State = {}\n\n    export const name = '" + name + "';\n    export default function " + _name + "Reducer(state: I" + _name + "State = initialState, action: any) {\n      return produce(state, draft => {\n        switch(action.type) {\n          default:\n            draft = state;\n            break;\n        }\n      })\n    }\n  ";
}
