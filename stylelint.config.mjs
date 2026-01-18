/** @type {import("stylelint").Config} */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-tailwindcss'],
  ignoreFiles: [
    '**/*.html',
    'node_modules/**/*.css',
    'dist/**/*.css',
    '**/global.scss',
    '**/tailwind.scss',
    './src/app/**/*.ts',
    '*.min.css'
  ]
};
