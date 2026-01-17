import process from 'node:process';
import { checkPackage } from './check-package-json.mjs';
import { execSyncWrapper } from '../misc-scripts/exec-utils.mjs';
import { checkMainModule } from './check-main-module.mjs';

export function checkNodeVersion() {
  try {
    console.log('\n\x1b[30m\x1b[47m%s\x1b[0m', ' Checking node version... ');

    const packageJsonEngines = checkPackage().engines;

    if (!packageJsonEngines) {
      console.error('\x1b[31m❌ The "engines" property was not found in the "package.json"\x1b[0m');

      process.exit(1);
    }

    if ((!'node') in packageJsonEngines) {
      console.error(
        '\x1b[31m❌ node was not found in the "engines" property of the "package.json"\x1b[0m'
      );

      process.exit(1);
    }

    const requiredNodeVersion = packageJsonEngines.node;

    if (!requiredNodeVersion) {
      console.error(
        '\x1b[31m❌ The node version is not set in the "engines" property of the "package.json"\x1b[0m'
      );

      process.exit(1);
    } else {
      const globalNodeVersion = execSyncWrapper('node -v').substring(1);

      if (requiredNodeVersion !== globalNodeVersion) {
        console.error(
          `\x1b[31m❌ The required Node version "${requiredNodeVersion}" is not installed\x1b[0m`
        );

        process.exit(1);
      } else {
        console.log(`\x1b[32mNode version: ${globalNodeVersion} ✅\x1b[0m`);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

checkMainModule(import.meta.url, checkNodeVersion);
