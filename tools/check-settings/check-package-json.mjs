import process from 'node:process';
import { checkFile, readFile } from '../misc-scripts/file-utils.mjs';

export function checkPackage() {
  const path = './package.json';

  if (!checkFile(path)) {
    console.error('\x1b[31m❌ The package.json file was not found!\x1b[0m');
    process.exit(1);
  }

  return JSON.parse(readFile(path, 'utf8'));
}
