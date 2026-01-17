import process from 'node:process';
import { checkNodeVersion } from './check-settings/check-node-version.mjs';
import { showBanner } from './misc-scripts/show-banner.mjs';
import { checkNodeModules } from './check-settings/check-node-modules.mjs';
import { dirTree } from './misc-scripts/dir-tree.mjs';

try {
  checkNodeVersion();

  showBanner('./800-storage.txt');

  if (checkNodeModules()) {
    await dirTree();
    const { runStart } = await import('./run-scripts/run-start.mjs');
    await runStart();
    process.exit(0);
  }
} catch (error) {
  console.error(
    '\x1b[31m❌ Error, please fix the error and run it again\x1b[0m => \x1b[41m%s\x1b[0m',
    ` ${error} `
  );

  process.exit(1);
}
