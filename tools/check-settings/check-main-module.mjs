import process from 'node:process';

export function checkMainModule(callerUrl, runFunction) {
  const normalizePath = (url) =>
    url
      .replace(/^file:\/\/\/?/, '')
      .replace(/\\/g, '/')
      .replace(/\/+$/, '');
  const file = decodeURI(normalizePath(`file://${process.argv[1].replaceAll('\\', '/')}`));

  if (normalizePath(callerUrl) === file || decodeURI(normalizePath(callerUrl)) === file) {
    runFunction();
  }
}
