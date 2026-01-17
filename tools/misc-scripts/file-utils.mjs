import { existsSync, mkdirSync, writeFileSync, readFileSync, readdir, readdirSync } from 'fs';
import { joinPaths } from './path-utils.mjs';

export function checkFile(filePath) {
  if (existsSync(filePath)) {
    return true;
  } else {
    console.error(`\x1b[31m❌ No file/directory found\x1b[0m \x1b[41m%s\x1b[0m`, ` ${filePath} `);

    return false;
  }
}
export function createDirectory(directoryPath) {
  try {
    mkdirSync(directoryPath, { recursive: true });

    return true;
  } catch (error) {
    console.error(
      `\x1b[31m❌ Failed to create directory at ${directoryPath}\x1b[0m => \x1b[41m%s\x1b[0m`,
      ` ${error.message} `
    );

    return false;
  }
}
export function writeFile(filePath, content) {
  try {
    writeFileSync(filePath, content, 'utf8');

    return true;
  } catch (error) {
    console.error(
      `\x1b[31m❌ Failed to write to file at ${filePath}\x1b[0m => \x1b[41m%s\x1b[0m`,
      ` ${error.message} `
    );

    return false;
  }
}
export function readFile(filePath) {
  try {
    if (!existsSync(filePath)) {
      throw new Error('File does not exist');
    }

    const content = readFileSync(filePath, 'utf8');

    return content;
  } catch (error) {
    console.error(
      `\x1b[31m❌ Failed to read file at ${filePath}\x1b[0m => \x1b[41m%s\x1b[0m`,
      ` ${error.message} `
    );

    console.error('\x1b[31m❌ No data found\x1b[0m');

    return null;
  }
}
export function listFiles(directoryPath) {
  return new Promise((resolve, reject) => {
    readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(
          `\x1b[31m❌ Failed to list files in ${directoryPath}\x1b[0m => \x1b[41m%s\x1b[0m`,
          ` ${err} `
        );

        console.error('x1b[31m❌ No data found\x1b[0m');
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}
export function checkForRecursiveFiles(dir, ext) {
  if (checkFile(dir)) {
    const entries = readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = joinPaths(dir, entry.name);

      if (entry.isFile() && fullPath.endsWith(ext)) {
        return true;
      }

      if (entry.isDirectory()) {
        const foundInSubDir = checkForRecursiveFiles(fullPath, ext);

        if (foundInSubDir) {
          return true;
        }
      }
    }

    console.error(`\x1b[31m❌ No ${ext} files found in ${dir}\x1b[0m`);

    return false;
  }
}
