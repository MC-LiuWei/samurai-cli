/*
 * @Author: your name
 * @Date: 2020-04-06 16:20:04
 * @LastEditTime: 2020-04-07 10:47:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/commons/packagesmanagers/abstract.packagemanager.ts
 */
import ora from 'ora';
import { join } from 'path';
import AbstractAdapter from "../adapters/abstract.adapter";
import { MESSAGES } from '../messages';
import { PackageManagerCommands } from './packageManagersCommands';
import { dasherize } from '../../utils/dasherize';

 export abstract class AbstractPackageManager {
     constructor(protected adapter: AbstractAdapter) {}

     public async install(dir: string, packageManager: string) {
         const loading = ora({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: MESSAGES.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS
         });
         loading.start();
         try {
             const commandsScripts = `${this.cli.install} --silent`;
             const collect = true;
             const dasherizeDir: string = dasherize(dir);
             await this.adapter.start(commandsScripts,collect,join(process.cwd(), dasherizeDir));
             loading.succeed();
             console.info();
         } catch (error) {
            loading.fail();
         }
     }

     public abstract get cli(): PackageManagerCommands;
 }