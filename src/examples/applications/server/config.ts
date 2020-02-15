import { join, extname } from 'path';
import { mkdir } from 'shelljs';
export default {
  name: "server",
  alias: "srr",
}

export function getProjectWebPath(project: string) {
  return [
    { type: 'dir', path: join(project, 'components'), name: 'components' },
    { type: 'dir', path: join(project, 'containers'), name: 'containers' },
    { type: 'dir', path: join(project, 'redux'), name: 'redux' },
    { type: 'dir', path: join(project, 'utils'), name: 'utils' },
  ];
}

export function getProjectSrrPath(project: string) {
  const srrpath = join(project, 'pages')
  return [
    { type: 'dir', path: srrpath, name: 'pages' },
    { type: 'dir', path: join(srrpath, 'views'), name: 'views' },
    { type: 'file', path: join(srrpath, '_app.tsx'), name: '_app' }
  ]
}

export function getProjectPath(project: string) {
  const webpath = getProjectWebPath(join(project, 'web'));
  const srrpath = getProjectSrrPath(project);
  return webpath.concat([
    { type: 'file', path: join(project, 'package.json'), name: 'package' },
    { type: 'file', path: join(project, 'README.md'), name: "README" },
    { type: 'file', path: join(project, '.gitignore'), name: 'gitignore' },
  ]).concat(srrpath);
}