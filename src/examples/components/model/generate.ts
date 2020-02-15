import { join } from 'path';
import { toUpperCase } from '../../../utils/utils';
import { mkdir } from 'shelljs';
import { writeFileSync } from 'fs';

const DEFAULTACTIONTYPE = 'EXAMPLEACTIONTYPE';

export default async function generate(path: string, name: string, options?: any) {
  const names = name.split("/");
  const modelName: any = names.pop();
  const pathName = join(path, names.join('/'));
  mkdir('-p', join(pathName, modelName));
  const containerCode = `export const ${DEFAULTACTIONTYPE} = '${DEFAULTACTIONTYPE}'`;
  const actionCode = createActionCode(modelName);
  const sagaCode = createSagaCode(modelName);
  const reducerCode = createReducerCode(modelName);
  const selectorsCode = createSelectorsCode(modelName);
  await writeFileSync(join(pathName, modelName, 'container.ts'), containerCode, { encoding: 'utf-8' });
  await writeFileSync(join(pathName, modelName, 'action.ts'), actionCode, { encoding: 'utf-8' });
  await writeFileSync(join(pathName, modelName, 'saga.ts'), sagaCode, { encoding: 'utf-8' });
  await writeFileSync(join(pathName, modelName, 'reducer.ts'), reducerCode, { encoding: 'utf-8' });
  await writeFileSync(join(pathName, modelName, 'selectors.ts'), selectorsCode, { encoding: 'utf-8' });
}

function createSelectorsCode(name: string) {
  const _name = toUpperCase(name);
  return `
  import { createSelector } from 'reselect';
  import { initialState, name } from './reducer';

  export const select${_name}State = (state: any) => state[name] || initialState;
  export const make${_name}Select = () => createSelector(select${_name}State, ${name}State => ${name}State);
  `
}

function createSagaCode(name: string) {
  const _name = toUpperCase(name);
  return `
    import { takeLatest } from 'redux-saga/effects';
    import { ${DEFAULTACTIONTYPE} } from './container';

    export function* ExampleSaga() {

    }

    export default function* ${_name}Saga() {
      yield takeLatest(${DEFAULTACTIONTYPE}, ExampleSaga);
    }
  `
}

function createActionCode(name: string) {
  const _name = toUpperCase(name);
  return `
    import { ${DEFAULTACTIONTYPE} } from './container';
    export function ${_name}Action() {
      return {
        type: ${DEFAULTACTIONTYPE}
      }
    }
  `
}


function createReducerCode(name: string) {
  const _name = toUpperCase(name);
  return `
    import produce from 'immer';

    export interface I${_name}State {}

    export const initialState:I${_name}State = {}

    export const name = '${name}';
    export default function ${_name}Reducer(state: I${_name}State = initialState, action: any) {
      return produce(state, draft => {
        switch(action.type) {
          default:
            draft = state;
            break;
        }
      })
    }
  `
}