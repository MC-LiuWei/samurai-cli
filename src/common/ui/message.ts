/*
 * @Author: 刘伟
 * @Date: 2020-06-12 23:30:21
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-04 19:12:39
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/ui/message.ts
 */
import { redBright, yellow, greenBright } from "chalk";
import EMOJI from "./emoji";

export enum MessageType {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export function statusMessage(type: MessageType, message: string) {
  switch (type) {
    case MessageType.SUCCESS:
      return `${EMOJI.WHITE_CHECK_MARK} ${greenBright(`${message}`)}`;
      break;
    case MessageType.ERROR:
      return `${EMOJI.RED_CIRCLE} ${redBright(`${message}`)}`;
      break;
    default:
      return `[INFO] ${message}`;
      break;
  }
  return `[${type}] ${message}`;
}

export default {
  packageVersionError: (version: string) => {
    return `${EMOJI.LAYING_FACE} ${yellow(
      `[WARN] 请检查包版本,当前版本为 ${version}`
    )}`;
  },
  runnerFactoryError: (runner: string) => {
    return yellow(`[WARN] 不支持的命令扩展: ${runner}`);
  },
  notFileError: (filename: string) => {
    return `${EMOJI.RED_CIRCLE} ${redBright(`[ERROR] 缺少文件 ${filename}`)}`;
  },
  packageVersionSuccess: `${EMOJI.WHITE_CHECK_MARK} ${greenBright(
    "[SUCCESS] 版本验证通过"
  )}`,
  runnering: (message: string) => {
    return `${EMOJI.RUNNER} ${yellow(message)}`;
  },
};
