/*
 * @Author: your name
 * @Date: 2020-04-06 14:28:22
 * @LastEditTime: 2020-04-06 14:51:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/examples/applications/examples/package/interface.ts
 */

interface IScripts {
    "start": string;
    "build": string;
    "test": string;
}

export interface IDependencies {
    [key: string]: string;
}

export default interface IPackageJson {
    name: string;
    version: string;
    description: string;
    scripts: IScripts;
    author: string;
    dependencies?: IDependencies;
    devDependencies?: IDependencies;
}