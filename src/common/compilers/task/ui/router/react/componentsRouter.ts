/*
 * @Author: 刘伟
 * @Date: 2020-06-27 17:05:28
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 17:01:21
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/router/react/componentsRouter.ts
 */
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { ClassName } from "../../../../../../utils";
import { dir } from "console";

function generateImport(dirs: string[], componentsPath: string) {
  return dirs.reduce((a, b) => {
    if (b) {
      a += `import ${ClassName(b)} from '../${componentsPath}/${b}';\n`;
    }
    return a;
  }, "");
}

function generateComponentsRouter(dirs: string[], componentsPath: string) {
  const arrCode = dirs.reduce((a, b) => {
    if (b) {
      if (!a) {
        a += `{ path: "${componentsPath}/${ClassName(
          b
        )}", Component: ${ClassName(b)} }`;
      } else {
        a += `,{ path: "${componentsPath}/${ClassName(
          b
        )}", Component: ${ClassName(b)} }`;
      }
      return a;
    }
    return a;
  }, "");
  if (!arrCode) {
    return "[]";
  } else {
    return `[${arrCode}]`;
  }
}

function generateRouterFileCode(dirs: string[], componentsPath: string) {
  const importCode = generateImport(dirs, componentsPath);
  const routerCode = generateComponentsRouter(dirs, componentsPath);
  return `
        ${importCode}
        export default ${routerCode};
    `;
}

export default function reactCompoentsRouterCode(
  rootPath: string,
  componentsPath: string
) {
  const components = join(rootPath, componentsPath);
  const dirs = readdirSync(components).filter((dir) =>
    statSync(join(components, dir)).isDirectory()
  );
  return generateRouterFileCode(dirs, componentsPath);
}
