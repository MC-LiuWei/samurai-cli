
import { mkdir } from 'shelljs';
import { redBright } from 'chalk';
import { join } from 'path';
import { writeFile, writeFileSync, readFileSync, existsSync } from 'fs';

interface IComponentOptions {
    ext: string;
    type: "Func" | "Class";
}

export default async function generate(dir: string, name: string, options: IComponentOptions) {
    const paths = name.split("/");
    let componentName: any = paths.pop();
    const path = join(dir, paths.join("/"));
    const entranceFile = `${path}/index.${options?.ext}`;
    componentName = componentName.replace(componentName[0], componentName[0].toUpperCase());
    if (!existsSync(path)) {
        mkdir('-p', path);
    }
    const componentCode = options.type === "Func" ? outComponentFuncCode(componentName) : outComponentClassCode(componentName);
    // 写入组件代码
    await writeFileSync(`${path}/${componentName}.${options.ext}`, componentCode, { encoding: "utf8" });
    // 更新入口文件代码
    await updateEntrance(entranceFile, componentName);
}

async function updateEntrance(path: string, componentName: string) {
    try {
        const insertCode = `export { default as ${componentName} } from './${componentName}';`;
        if (!existsSync(path)) {
            await writeFileSync(path, insertCode, { encoding: "utf-8" });
            return true
        } else {
            let entranceFileCode = await readFileSync(path, { encoding: "utf-8" });
            entranceFileCode = `${entranceFileCode}\r${insertCode}`;
            await writeFileSync(path, entranceFileCode, { encoding: "utf-8" });
            return true
        }
    } catch (error) {
        console.log(redBright("update entrance error"));
        process.exit(1);
    }
}

function outComponentFuncCode(name: string) {
    const interfaceName = `I${name}Props `;
    return `
        import React, { useState } from 'react';
        import PropTypes from 'prop-types';

        interface ${interfaceName} {}
        function ${name}(props: ${interfaceName}) {
            return (
                <div>Hello, ${name}</div>
            );
        }

        ${name}.defaultProp = {};
        ${name}.propTypes = {};
        export default ${name}
    `
}

function outComponentClassCode(name: string) {
    const interfaceProps = `I${name}Props`;
    const interfaceState = `I${name}State`;
    return `
        import React, { Component } from 'react';
        import PropTypes from 'prop-types';

        interface ${interfaceProps} {}
        class ${name} extends Component<${interfaceProps},${interfaceState}, any> {
            constructor(props: ${interfaceProps}, content: any) {
                this.state = {},
            }
            render(){
                return (
                    <div>Hello,${name}</div>
                )
            }
        }

        ${name}.defaultProp = {};
        ${name}.propTypes = {};
        export default ${name};
    `
}