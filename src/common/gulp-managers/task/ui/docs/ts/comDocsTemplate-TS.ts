export const comDocsTemplateTs = `import React, { Component } from 'react';
import connect from '{{ connect }}';
import data from './{{data}}'

const WarpComponent = connect("docs", data);
export default class {{name}} extends Component {
    render() {
        return (
            <WarpComponent {...this.props} />
        );
    }
}
`;
