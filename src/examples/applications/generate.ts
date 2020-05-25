/*
 * @Author: your name
 * @Date: 2020-04-05 20:32:00
 * @LastEditTime: 2020-04-06 15:29:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/examples/applications/generate.ts
 */
import { mkdir, cp } from 'shelljs';
import { join } from 'path';
import { execSync } from 'child_process';
import { readJsonToObject, writeObjectToJsonFile } from '../../utils';
import { createPackage } from './examples/package';

interface IDirtomap {
    [key: string]: string;
}

interface IFiletomap {
    [key: string]: { source: string; target: string }
}

const examplesPaths = join(__dirname, "examples");

export default async function generate(name: string, path: string) {
    console.log(name, path);
    const dirToMap: IDirtomap = {
        envs: join(path, "envs"),
        src: join(path, "src"),
        pages: join(path, "pages"),
        coverage: join(path, "coverage"),
        cypress: join(path, "cypress"),
    }
    const filesToMap: IFiletomap = {
        // gitignore: { target: path, source: join(examplesPaths, '.gitignore') },
        cypress: {target: path, source: join(examplesPaths, 'cypress.json') },
        // nextconfig: { target: path, source: join(examplesPaths, 'next.config.js') },
        nodemon: { target: path, source: join(examplesPaths, 'nodemon.json') },
        tsconfigBuild: { target: path, source: join(examplesPaths, 'tsconfig.build.json') },
        tsconfig: { target: path, source: join(examplesPaths, 'tsconfig.json') },
        tslint: { target: path, source: join(examplesPaths, 'tslint.json') },
        //packageJson: { target: path, source: join(examplesPaths, 'package.json')}
    }
    mkdir("-p", path);
    mkdirDir(dirToMap);
    copyFile(filesToMap);
    createPackage(
        name,
        path, 
        ["@nestjs/common", "@nestjs/core", "@nestjs/platform-express", "dotenv", "nest-next", "next"],
        ["@types/node", "@nestjs/testing", "ts-node", "ts-jest", "supertest", "prettier", "nodemon", "tslint", "typescript", "webpack"]
    );
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

function installPackage() {
    const dependencies = ["@nestjs/common", "@nestjs/core", "@nestjs/platform-express", "dotenv", "nest-next", "next"]
    const dev = ["@types/node", "@nestjs/testing", "ts-node", "ts-jest", "supertest", "prettier", "nodemon", "tslint", "typescript", "webpack"]
    const depScripts = dependencies.join(" ");
    const devScripts = dev.join(" ");
    execSync(`npm i ${depScripts}`);
    execSync(`npm i ${devScripts} --save-dev`);
}