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
  const pathname = join(path, name);
  const filename = !!ext ? fileName : `${name}.tsx`;
  const componentCode = outComponentFuncCode(name);
  mkdir('-p', pathname);
  await writeFileSync(join(pathname, filename), componentCode, { encoding: "utf8" });
  process.exit(0);
}

function outComponentFuncCode(name: string) {
  const interfaceName = `I${name}Props `;
  return `
      import React, { useState } from 'react';
      import PropTypes from 'prop-types';
      import { Dispatch } from 'redux';
      import { connect } from 'react-redux';

      interface ${interfaceName} {}
      function ${name}(props: ${interfaceName}) {
          return (
              <div>Hello, ${name}</div>
          );
      }

      ${name}.defaultProp = {};
      ${name}.propTypes = {};
      const mapStateToProps = (state: any) => ({})
      const mapDispatchToProps = (dispatch: Dispatch) => {
          return {}
      }
      export default connect(mapStateToProps, mapDispatchToProps)(${name});
  `
}