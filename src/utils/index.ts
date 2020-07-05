/*
 * @Author: 刘伟
 * @Date: 2020-06-27 17:25:01
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-05 09:20:14
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/utils/index.ts
 */
import { readdirSync, statSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

export enum Directory {
  FILE = "File",
  DIRECTORY = "Directory",
  ALL = "All",
}

export function ClassName(str: string) {
  str = str.trim();
  return str.replace(str[0], str[0].toUpperCase());
}

export function findDirectory(path: string, type?: Directory): string[] {
  const dirs = readdirSync(path).map((filename) => join(path, filename));
  switch (type) {
    case Directory.DIRECTORY:
      return dirs.filter((dir) => statSync(dir).isDirectory());
      break;
    case Directory.FILE:
      return dirs.filter((dir) => statSync(dir).isFile());
      break;
    default:
      return dirs;
      break;
  }
}

export function findTempDirectory(rootPath = process.cwd(), path: string) {
  const options = ["node_modules", "samurai-cli"];
  const currentPath = join(rootPath, ...options),
    tempPath = join(currentPath, path);
  console.log(currentPath);
  if (!existsSync(currentPath)) {
    mkdirSync(currentPath);
  }
  if (!existsSync(tempPath)) {
    mkdirSync(tempPath);
  }
  return tempPath;
}
