/*
 * @Author: 刘伟
 * @Date: 2020-06-12 23:30:21
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-13 14:27:10
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/ui/message.ts
 */
import { redBright, yellow } from "chalk";
import EMOJI from "./emoji";

export default {
  packageVersionError: `${EMOJI.LAYING_FACE} ${redBright(
    "Please check the version of the package"
  )}`,
  runnerFactoryError: (runner: string) => {
    return yellow(`[WARN] Unsupported runner: ${runner}`);
  },
};
