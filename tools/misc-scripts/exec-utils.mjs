import { execSync, exec, spawn } from 'child_process';
import { promisify } from 'util';

export function execSyncWrapper(command, options = {}, asString = true, shouldThrow = false) {
  try {
    const result = execSync(command, options);

    if (asString && result !== null && result !== undefined) {
      return result.toString().trim();
    }

    return result;
  } catch (error) {
    console.error(`\x1b[31m❌ Error\x1b[0m => \x1b[41m%s\x1b[0m`, ` ${error.message} `);

    if (shouldThrow) {
      throw error;
    }

    return null;
  }
}
export function execWrapper(command, callback) {
  try {
    exec(command, (err, stdout, stderr) => {
      if (callback) {
        callback(err, stdout, stderr);
      }
    });
  } catch (error) {
    console.error(`\x1b[31m❌ Error\x1b[0m => \x1b[41m%s\x1b[0m`, ` ${error.message} `);
  }
}
export function execPromise() {
  try {
    return promisify(exec);
  } catch (error) {
    console.error(`\x1b[31m❌ Error\x1b[0m => \x1b[41m%s\x1b[0m`, ` ${error.message} `);
  }
}
export function spawnWrapper(command, args = [], options = {}) {
  try {
    return spawn(command, args, options);
  } catch (error) {
    console.error(`\x1b[31m❌ Error\x1b[0m => \x1b[41m%s\x1b[0m`, ` ${error.message} `);
  }
}
