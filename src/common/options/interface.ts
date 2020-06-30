/*
 * @Author: 刘伟
 * @Date: 2020-06-27 16:51:33
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-27 16:51:41
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/options/interface.ts
 */
export interface ConfigFile {
  schematic: string; // 生成模版
  library: string | string[]; // 基础库
  language: string; // 使用的基础语言
}
