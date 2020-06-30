/*
 * @Author: 刘伟
 * @Date: 2020-06-27 17:25:01
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-27 17:26:46
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/utils/index.ts
 */
export function ClassName(str: string) {
  str = str.trim();
  return str.replace(str[0], str[0].toUpperCase());
}
