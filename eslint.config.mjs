import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import json from "@eslint/json";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ...js.configs.recommended,
    languageOptions: { globals: globals.browser }
  },
  {
    files: ["**/*.{ts,mts,cts}"],
    ...tseslint.configs.recommended,
    ...tseslint.configs.stylistic,
  },
  {
    files: ["**/*.ts"],
    ...angular.configs.tsRecommended,
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    ...angular.configs.templateRecommended,
    ...angular.configs.templateAccessibility,
    rules: {},
  },
  {
    files: ["**/*.json"],
    ...json.configs.recommended
  },
];
