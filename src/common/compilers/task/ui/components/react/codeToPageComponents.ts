/*
 * @Author: 刘伟
 * @Date: 2020-06-28 17:07:39
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 20:09:57
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/components/react/codeToPageComponents.ts
 */
import gulp from "gulp";
import { readdirSync, statSync, writeFileSync } from "fs";
import { ParsedArgs } from "minimist";
import { join, basename, extname } from "path";
import { ClassName } from "../../../../../../utils";

const sort = [];

function generateComponentsMainCode(dirs: string[]) {
  const importCode = dirs.reduce((a, b) => {
    if (b) {
      const name = basename(b).replace(extname(b), "");
      a += `\nimport ${ClassName(name)} from './${name}';`;
    }
    return a;
  }, "import React from 'react';");
  const mainCode = dirs.reduce((a, b) => {
    if (b) {
      const name = basename(b).replace(extname(b), "");
      a += `<${ClassName(name)}/>\n`;
    }
    return a;
  }, "");
  return `
    ${importCode}
    export default function ComponentsPage() {
        return (
            <div>${mainCode}</div>
        )
    }
  `;
}

export default function codeToPageComponents(options: ParsedArgs) {
  const { path, docs, language, library } = options;
  const main = "index.tsx";
  const rootPath = path.split("/").pop() as string;
  const docsComponent = join(docs, rootPath);
  const dirs = readdirSync(docsComponent).filter((dir) =>
    statSync(join(docsComponent, dir)).isDirectory()
  );
  dirs.forEach((dir) => {
    const dirs = readdirSync(join(docsComponent, dir)).filter((_dir) =>
      statSync(join(docsComponent, dir, _dir)).isFile()
    );
    const mainCode = generateComponentsMainCode(dirs);
    writeFileSync(join(docsComponent, dir, main), mainCode, {
      encoding: "utf8",
    });
  });
}
