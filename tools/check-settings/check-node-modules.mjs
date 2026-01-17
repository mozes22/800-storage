import process from 'node:process';
import { checkFile } from '../misc-scripts/file-utils.mjs';

export function checkNodeModules() {
  const nodeModules = './node_modules';

  if (!checkFile(`./${nodeModules}`)) {
    console.error(`\x1b[31m❌ ${nodeModules} directory does not exist\x1b[0m`);
    process.exit(1);
  }

  return true;
}
