/*
 * @Author: your name
 * @Date: 2020-04-07 09:58:06
 * @LastEditTime: 2020-04-07 10:16:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/commons/adapters/adapter.factory.ts
 */
import * as chalk from 'chalk';
import { Adapter } from "./adapter.enums";
import { NpmAbstract } from './npm.adapter';
import { YarnAbstract } from './yarn.adapter';
import { GitAbstract } from './git.adapter';
import { TemplateAbstract } from './template.adapter';

export default class AdapterFactory {
    static create(adapter: Adapter) {
        switch(adapter){
            case Adapter.NPM:
                return new NpmAbstract();
                break;
            case Adapter.YARN:
                return new YarnAbstract();
                break;
            case Adapter.GIT:
                return new GitAbstract();
                break;
            case Adapter.TEMPLATE:
                return new TemplateAbstract();
                break;
            default:
                console.info(chalk.yellow(`[WARN] Unsupported runner: ${adapter}`));
        }
    }
}