/*
 * @Author: 刘伟
 * @Date: 2020-06-28 13:47:26
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 14:04:39
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/ui/loading.ts
 */
import ora from "ora";
import message from "./message";

export function runnerLoading(info: string) {
  return ora({
    spinner: {
      interval: 100,
      frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    },
    text: message.runnering(info),
  });
}
