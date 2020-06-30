/*
 * @Author: 刘伟
 * @Date: 2020-06-27 16:08:18
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 18:27:22
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/components/react/componentsTemplate.ts
 */
import { Language } from "../../../../../options/enums";

export function apiTsComponents(data: string) {
  return `
          import React from 'react';
          import jsonmlToReactElement from "jsonml-to-react-element";
          const data = ${data};
  
          interface IApiItemProps {
              name: string;
              data: any
          }
  
          function ApiItem(props:IApiItemProps) {
              return (
                  <div>
                      { jsonmlToReactElement(props.data) }
                  </div>
              )
          }
  
          export default function Api(props: any) {
              return (
                  <div>
                      { Object.entries(data).map((dat) => (
                          <ApiItem key={dat[0]} name={dat[0]} data={dat[1]} />
                      )) }
                  </div>
                  );
          }
      `;
}

function detailTsComponents(data: string) {
  return `
    import React from 'react';
    import jsonmlToReactElement from "jsonml-to-react-element";
    const data = ${data};

    export default function Detail(props: any) {
        return (
            <div>
            { jsonmlToReactElement(props.data) }
            </div>
            );
    }
`;
}

export function detailComponents(data: string, language?: Language) {
  switch (language) {
    case Language.TS:
      return detailTsComponents(data);
      break;

    default:
      return detailTsComponents(data);
      break;
  }
}

export default function apiComponents(data: string, language?: Language) {
  switch (language) {
    case Language.TS:
      return apiTsComponents(data);
      break;
    default:
      return apiTsComponents(data);
      break;
  }
}
