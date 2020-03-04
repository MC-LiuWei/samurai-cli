
import { mkdir, touch } from 'shelljs';
import { greenBright, whiteBright } from 'chalk';
import { join, extname } from 'path';
import { writeFile, writeFileSync, readFileSync, existsSync } from 'fs';
import { toUpperCase } from '../../../utils/utils';

interface IComponentOptions {
    ext: string;
    type: "Func" | "Class";
}

export default async function generate(path: string, fileName: string, options?: IComponentOptions) {
    const ext = extname(fileName);
    const _filename = fileName.split(".");
    const name: any = _filename.shift();
    const pathname = !!ext ? path : join(path, toUpperCase(name));
    const stylespath = join(pathname, 'styles');
    const filename = !!ext ? toUpperCase(fileName) : `${toUpperCase(name)}.tsx`;
    const indexFile = join(pathname, 'index.tsx');
    const styleFile = join(stylespath, `${toUpperCase(name)}.styles.ts`);
    const indexStyleFile = join(stylespath, `index.ts`);
    const componentCode = outComponentFuncCode(toUpperCase(name));
    mkdir('-p', pathname);
    console.log(greenBright('[CREATE DIR]: '), whiteBright(pathname));
    mkdir('-p', stylespath);
    console.log(greenBright('[CREATE DIR]: '), whiteBright(stylespath));
    await writeFileSync(join(pathname, filename), componentCode, { encoding: "utf8" });
    console.log(greenBright('[CREATE COMPONENT FILE]: '), whiteBright(join(pathname, filename)));
    await touch(styleFile);
    await updateEntrance(indexFile, toUpperCase(name));
    await updateStylesEntrance(indexStyleFile, toUpperCase(name));
    process.exit(0);
}

async function updateEntrance(path: string, componentName: string) {
    if (!existsSync(path)) {
        touch(path);
    }
    const insertCode = `export { default as ${componentName} } from './${componentName}';`;
    let entranceFileCode = await readFileSync(path, { encoding: "utf-8" });
    entranceFileCode = `${entranceFileCode}\r${insertCode}`;
    await writeFileSync(path, entranceFileCode, { encoding: "utf-8" });
}

async function updateStylesEntrance(path: string, styleName: string) {
    if (!existsSync(path)) {
        touch(path);
    }
    const insertCode = `export { default as ${styleName}Style } from './${styleName}.styles.ts';`;
    let entranceFileCode = await readFileSync(path, { encoding: "utf-8" });
    entranceFileCode = `${entranceFileCode}\r${insertCode}`;
    await writeFileSync(path, entranceFileCode, { encoding: 'utf-8' });
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