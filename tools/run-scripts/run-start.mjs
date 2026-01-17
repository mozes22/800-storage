import { execSyncWrapper } from '../misc-scripts/exec-utils.mjs';
import { checkMainModule } from '../check-settings/check-main-module.mjs';

export async function runStart() {
  console.log('\n\x1b[30m\x1b[47m%s\x1b[0m', ' Starting App... ');
  execSyncWrapper('npm start', { stdio: 'inherit' }, false, true);
}

checkMainModule(import.meta.url, runStart);
