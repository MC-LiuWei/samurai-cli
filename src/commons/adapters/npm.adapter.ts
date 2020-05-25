/*
 * @Author: your name
 * @Date: 2020-04-07 09:53:39
 * @LastEditTime: 2020-04-07 10:10:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/commons/adapters/npm.adapter.ts
 */
import AbstractAdapter from './abstract.adapter';

export class NpmAbstract extends AbstractAdapter {
    constructor() {
        super('npm');
    }
}