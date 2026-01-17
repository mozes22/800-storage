import { getDirectoryName, getCurrentFileName, joinPaths } from './path-utils.mjs';
import { readFile } from './file-utils.mjs';

export function showBanner(filePath) {
  try {
    const __dirname = getDirectoryName(getCurrentFileName(import.meta.url));
    const data = readFile(joinPaths(__dirname, '../', filePath), 'utf8');
    console.log();
    console.log('\x1b[38;2;242;101;34m%s\x1b[0m', data);
  } catch (error) {
    throw new Error(error.message);
  }
}
