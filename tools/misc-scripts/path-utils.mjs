import process from 'node:process';
import { fileURLToPath } from 'url';
import { join, extname, dirname, resolve, basename } from 'path';

export function joinPaths(...segments) {
  return join(...segments);
}
export function getFileExtension(filePath) {
  return extname(filePath);
}
export function getDirectoryName(filePathOrUrl) {
  const filePath = filePathOrUrl.startsWith('file://')
    ? fileURLToPath(filePathOrUrl)
    : filePathOrUrl;

  return dirname(filePath);
}
export function getCurrentFileName(metaUrl) {
  return fileURLToPath(metaUrl);
}
export function resolvePath(...segments) {
  return resolve(...segments);
}
export function getRootPath() {
  return process.cwd();
}
export function changeDirectory(newPath) {
  process.chdir(newPath);
}
export function getBaseName(filePath, extension = '') {
  return basename(filePath, extension);
}
