/*
 * @Author: your name
 * @Date: 2020-04-07 09:53:39
 * @LastEditTime: 2020-04-07 10:12:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/commons/adapters/npm.adapter.ts
 */
import AbstractAdapter from './abstract.adapter';

export class YarnAbstract extends AbstractAdapter {
    constructor() {
        super('yarn');
    }
}