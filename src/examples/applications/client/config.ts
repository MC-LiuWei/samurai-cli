import { join } from 'path';
import { mkdir } from 'shelljs';
export default {
  name: "client",
  alias: "c",
}


export function getProjectPath(project: string) {
  return [
    { type: 'dir', path: join(project, 'components'), name: 'components' },
    { type: 'dir', path: join(project, 'containers'), name: 'containers' },
    { type: 'dir', path: join(project, 'redux'), name: 'redux' },
    { type: 'dir', path: join(project, 'utils'), name: 'utils' },
    { type: 'file', path: join(project, 'package.json'), name: 'package' },
    { type: 'file', path: join(project, 'README.md'), name: "README" },
    { type: 'file', path: join(project, '.gitignore'), name: 'gitignore' }
  ];
}