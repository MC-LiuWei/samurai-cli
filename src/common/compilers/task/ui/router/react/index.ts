/*
 * @Author: 刘伟
 * @Date: 2020-06-27 17:36:45
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 17:04:42
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/router/react/index.ts
 */
import gulp from "gulp";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import components from "./componentsRouter";
import { join } from "path";

export default function reactRouter(
  rootPath: string,
  componentsPath: string,
  routerPath: string
) {
  const mainName = "index.ts";
  const componentsCode = components(rootPath, componentsPath);
  const router = join(rootPath, routerPath);
  const main = join(router, mainName);
  if (!existsSync(router)) {
    mkdirSync(router);
  }
  writeFileSync(join(router, `${componentsPath}.ts`), componentsCode, {
    encoding: "utf8",
  });
  const mainCode = `
    import ${componentsPath} from './${componentsPath}';\n
  `;
  writeFileSync(main, mainCode, {
    encoding: "utf8",
  });
}
