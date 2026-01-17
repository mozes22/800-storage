import process from 'node:process';
import { checkModules } from '../check-settings/check-modules.mjs';
import { checkMainModule } from '../check-settings/check-main-module.mjs';

export async function dirTree() {
  console.log('\n\x1b[30m\x1b[47m%s\x1b[0m', ' Generating directory tree... ');

  if (!checkModules(['tree-cli', 'chalk'])) {
    console.error('\x1b[31m❌ tree-cli and/or chalk module(s) was/were not found\x1b[0m');

    process.exit(1);
  } else {
    const tree = (await import('tree-cli')).default;
    const chalk = (await import('chalk')).default;
    try {
      const fileName = './directory-tree.txt';

      await tree({
        ignore: [
          '--cache-strategy',
          '--format',
          '--formatter',
          '.analyze',
          '.git/',
          'coverage',
          'dist',
          'node_modules/',
          '.gitignore'
        ],
        debug: false,
        noreport: false,
        l: 10,
        o: fileName,
        directoryFirst: true
      });

      console.log(
        `${chalk.green('Directory list has been generated updated:')} ${chalk.bgGreen.white(` ${fileName} `)}`
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

checkMainModule(import.meta.url, dirTree);
