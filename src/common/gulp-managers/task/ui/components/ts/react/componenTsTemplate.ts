/*
 * @Author: 刘伟
 * @Date: 2020-07-14 22:31:10
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-07-14 23:37:38
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/gulp-managers/task/ui/components/ts/react/componenTsTemplate-TS-React.ts
 */
export const comMainTemplateTsReact = `import React, { Component } from 'react';
import JsonmlToReactElement from 'jsonml-to-react-element';
import connect from '{{ connect }}'
import data from './{{data}}';

const WarpComponents = connect("components",data);
export default class {{name}} extends Component {
    render() {
        return <WarpComponents {...this.props} />;
    }
}
`;
