/*
 * @Author: your name
 * @Date: 2020-03-10 15:20:40
 * @LastEditTime: 2020-04-06 14:26:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/utils/files.ts
 */
import fs from 'fs';
import os from 'os';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

export function writeObjectToJsonFile(filename: string, object: object): Promise<void> {
    return writeFile(filename, JSON.stringify(object, null, 2).replace(/\n/g, os.EOL) + os.EOL);
}

export function readJsonToObject(filepath: string):Promise<any> {
    return readFile(filepath, "utf8").then((f) => JSON.parse(f.trim()));
}