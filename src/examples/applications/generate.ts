/*
 * @Author: your name
 * @Date: 2020-04-05 20:32:00
 * @LastEditTime: 2020-04-05 21:07:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/examples/applications/generate.ts
 */
import { mkdir, cp } from 'shelljs';
import { join } from 'path';

interface IDirtomap {
    [key: string]: string;
}

interface IFiletomap {
    [key: string]: { source: string; target: string }
}

const examplesPaths = join(__dirname, "examples");

export default async function generate(name: string, path: string) {
    const dirToMap: IDirtomap = {
        envs: join(path, "envs"),
        src: join(path, "src"),
        pages: join(path, "pages"),
        coverage: join(path, "coverage"),
        cypress: join(path, "cypress"),
    }
    const filesToMap: IFiletomap = {
        gitignore: { target: path, source: join(examplesPaths, '.gitignore') },
        cypress: {target: path, source: join(examplesPaths, 'cypress.json') },
        nextconfig: { target: path, source: join(examplesPaths, 'next.config.js') },
        nodemon: { target: path, source: join(examplesPaths, 'nodemon.json') },
        tsconfigBuild: { target: path, source: join(examplesPaths, 'tsconfig.build.json') },
        tsconfig: { target: path, source: join(examplesPaths, 'tsconfig.json') },
        tslint: { target: path, source: join(examplesPaths, 'tslint.json') },
    }
    mkdir("-p", path);
    mkdirDir(dirToMap);
    copyFile(filesToMap);
}

function mkdirDir(paths: IDirtomap) {
    const dirs = Object.values(paths);
    dirs.forEach((item) => {
        mkdir("-p", item);
    });
}

function copyFile(paths: IFiletomap) {
    const dirs = Object.values(paths);
    dirs.forEach((item) => {
        cp("-f", item.source, item.target);
    });
}