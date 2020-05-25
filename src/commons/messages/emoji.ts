/*
 * @Author: your name
 * @Date: 2020-04-06 17:40:17
 * @LastEditTime: 2020-04-06 17:45:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /samurai-cli/src/commons/messages/emoji.ts
 */
import {get} from 'node-emoji';

export const EMOJIS = {
    heart: get('heart'),
    coffee: get('coffee'),
    beer: get('coffee'),
    broken_heart: get('broken_heart'),
    crying: get('crying_cat_face'),
    heart_eyes: get('heart_eyes_cat')
}