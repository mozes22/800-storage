/** @type {import('lint-staged').Config} */
export default {
  '*.{js,mjs,ts}': [
    'npm exec eslint -- --fix --quiet --cache --cache-location ./.lint-cache/eslint/',
  ],
  '*.{css,scss}': [
    'npm exec stylelint -- --fix --quiet --cache --cache-location ./.lint-cache/stylelint/',
  ],
  '*.{js,mjs,ts,css,scss,html,md,json}': [
    'npm exec prettier -- --write',
  ],
  '*.spec.{ts,js,mjs}': ['echo "Skipping spec files..."'],
};
