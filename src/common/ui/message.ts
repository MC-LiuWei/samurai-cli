/*
 * @Author: 刘伟
 * @Date: 2020-06-12 23:30:21
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-24 14:26:31
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/ui/message.ts
 */
import { redBright, yellow, greenBright } from "chalk";
import EMOJI from "./emoji";

export default {
  packageVersionError: (version: string) => {
    return `${EMOJI.LAYING_FACE} ${redBright(
      `Please check the packaging version, the latest version is ${version}`
    )}`;
  },
  runnerFactoryError: (runner: string) => {
    return yellow(`[WARN] Unsupported runner: ${runner}`);
  },
  notFileError: (filename: string) => {
    return `${EMOJI.RED_CIRCLE} ${redBright(
      `[ERROR] No file ${filename} found`
    )}`;
  },
  packageVersionSuccess: `${EMOJI.WHITE_CHECK_MARK} ${greenBright(
    "Version verification passed"
  )}`,
};
