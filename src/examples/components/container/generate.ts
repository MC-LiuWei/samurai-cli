import { mkdir, touch } from 'shelljs';
import { redBright } from 'chalk';
import { join, extname } from 'path';
import { writeFileSync } from 'fs';
import { toUpperCase } from '../../../utils/utils';

export default async function generate(path: string, fileName: string, options?: any) {
  const ext = extname(fileName);
  const _filename = fileName.split(".");
  const name: any = _filename.shift();
  const Name: string = toUpperCase(name);
  const pathname = path;
  const filename = !!ext ? toUpperCase(fileName) : `${Name}.tsx`;
  const componentCode = outComponentFuncCode(Name, options["server"]);
  mkdir('-p', pathname);
  await writeFileSync(join(pathname, filename), componentCode, { encoding: "utf8" });
  process.exit(0);
}

function outComponentFuncCode(name: string, server: boolean) {
  const interfaceName = `I${name}Props `;
  return `
      import React, { useState } from 'react';
      ${server ? "import { NextPage, NextPageContext } from 'next';" : ""}
      import PropTypes from 'prop-types';
      import { Dispatch } from 'redux';
      import { connect } from 'react-redux';

      interface ${interfaceName} {
        ${
    server ? 'query: any;\r[key:string]:any;' : ''
    }
      }
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
      ${
    server ?
      `const connectView: NextPage<any> = connect(mapStateToProps, mapDispatchToProps)(${name});
        connectView.getInitialProps = async (ctx: NextPageContext) => {
          const { query } = ctx;
          return { query };
      };
      export default connectView;
        `:
      `export default connect(mapStateToProps, mapDispatchToProps)(${name});`
    }
  `
}