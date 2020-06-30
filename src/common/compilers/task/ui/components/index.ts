/*
 * @Author: 刘伟
 * @Date: 2020-06-27 16:25:48
 * @LastEditors: 刘伟
 * @LastEditTime: 2020-06-28 17:27:45
 * @Description: Do not edit
 * @FilePath: /samurai-cli/src/common/compilers/task/ui/components/index.ts
 */
import makeReactToApi from "./react/codeToApiComponents";
import makeReactToDetail from "./react/codeToDetailComponents";
import makeReactToPage from "./react/codeToPageComponents";
import { UiLibrary } from "../../../../options/enums";

const mapComponentsMakeFunc = {
  react: makeReactToApi,
};

const mapComponentsMakeDetailFunc = {
  react: makeReactToDetail,
};

const mapComponentsMakePageFunc = {
  react: makeReactToPage,
};

export function ComponentsPageFactory(library: UiLibrary) {
  switch (library) {
    case UiLibrary.REACT:
      return mapComponentsMakePageFunc[library];
      break;
    default:
      return mapComponentsMakeDetailFunc["react"];
      break;
  }
}

export function ComponentsDetailFactory(library: UiLibrary) {
  switch (library) {
    case UiLibrary.REACT:
      return mapComponentsMakeDetailFunc[library];
      break;
    default:
      return mapComponentsMakeDetailFunc["react"];
      break;
  }
}

export default function ComponentsApiFactory(library: UiLibrary) {
  switch (library) {
    case UiLibrary.REACT:
      return mapComponentsMakeFunc[library];
      break;
    default:
      return mapComponentsMakeFunc["react"];
      break;
  }
}
