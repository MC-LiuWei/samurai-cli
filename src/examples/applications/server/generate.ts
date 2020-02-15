import { mkdir, touch } from 'shelljs';
import { join } from 'path';
import { getProjectPath } from './config';
import componentsGen from '../../components/component/generate';
export default function generate(path: string, name: string, options?: any) {
  const project = join(path, name);
  generateProjectDir(project);
}

/**
 * 构建项目结构
 * @param {string} project
 */
function generateProjectDir(project: string) {
  const paths = getProjectPath(project);
  paths.forEach((item) => {
    if (item.type === 'dir') {
      mkdir('-p', item.path);
    }
    if (item.type === 'file') {
      touch(item.path);
    }
  })
}