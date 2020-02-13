
import { mkdir, touch } from 'shelljs';
import { redBright } from 'chalk';
import { join, extname } from 'path';
import { writeFile, writeFileSync, readFileSync, existsSync } from 'fs';

interface IComponentOptions {
    ext: string;
    type: "Func" | "Class";
}

export default async function generate(path: string, fileName: string, options?: IComponentOptions) {
    const ext = extname(fileName);
    const _filename = fileName.split(".");
    const name: any = _filename.shift();
    const pathname = !!ext ? path : join(path, name);
    const filename = !!ext ? fileName : `${name}.tsx`;
    const indexFile = join(pathname, 'index.tsx');
    const componentCode = outComponentFuncCode(name);
    mkdir('-p', pathname);
    if (!existsSync(indexFile)) {
        touch(indexFile);
    }
    await writeFileSync(join(pathname, filename), componentCode, { encoding: "utf8" });
    await updateEntrance(indexFile, name);
    process.exit(0);
}

async function updateEntrance(path: string, componentName: string) {
    const insertCode = `export { default as ${componentName} } from './${componentName}';`;
    let entranceFileCode = await readFileSync(path, { encoding: "utf-8" });
    entranceFileCode = `${entranceFileCode}\r${insertCode}`;
    await writeFileSync(path, entranceFileCode, { encoding: "utf-8" });
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