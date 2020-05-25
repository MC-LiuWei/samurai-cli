/*
 * @Author: your name
 * @Date: 2020-04-06 14:49:08
 * @LastEditTime: 2020-04-06 15:17:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/examples/applications/examples/package/create.ts
 */
import { spawn, exec } from 'child_process';
import IPackageJson, { IDependencies } from './interface';
import { join } from 'path';
import { writeObjectToJsonFile } from '../../../../utils';


export default async function create(name: string, path: string, dep: string[] = [], devDep: string[] = []) {
    const packageJson: IPackageJson = {
        name,
        version: "1.0.0",
        description: "",
        scripts: {
            "start": "",
            "build": "",
            "test": ""
        },
        author: ""
    };
    const packageJsonPath = join(path, 'package.json');
    const depScripts: string = dep.join(" ");
    const devDepScripts: string = devDep.join(" ");

    await writeObjectToJsonFile(packageJsonPath, packageJson);
    exec(`npm i ${depScripts}`, (err, stu, std) =>{
        if (!err) {
            console.log('stu', stu);
            console.log('std', std);
        }
    });
}