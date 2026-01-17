import { checkNodeModules } from './check-node-modules.mjs';
import { checkFile } from '../misc-scripts/file-utils.mjs';

export function checkModules(modules) {
  if (checkNodeModules()) {
    const missingModules = modules.filter((module) => !checkFile(`./node_modules/${module}`));

    if (missingModules.length === 0) {
      return true;
    }

    const list = missingModules.join(' ');
    console.warn(
      `\x1b[33mrun "npm install ${list} --save-dev" to install the missing module(s)\x1b[0m`
    );

    return false;
  }
}
