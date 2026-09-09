import { tanstackConfig } from "@tanstack/eslint-config";
import { globalIgnores, defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import prettierConfig from "./prettier.config.js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import { eslintBoundariesConfig } from "./eslint.boundaries.js";

export default defineConfig([
  globalIgnores([
    "dist",
    "build",
    "node_modules",
    "**/routeTree.gen.ts",
    "eslint.config.js",
    "prettier.config.js",
    "openapi-generator.ts",
    "__generated__",
    "eslint.boundaries.js",
    "postcss.config.js",
    "stylelint.config.js",
    "**/storybook-static",
    "**/core/i18n/",
  ]),
  ...tanstackConfig,
  ...pluginQuery.configs["flat/recommended"],
  {
    files: ["prettier.config.js", "eslint.config.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    plugins: {
      react: pluginReact,
      "simple-import-sort": simpleImportSort,
      "@typescript-eslint": tseslint.plugin,
    },
    extends: [
      pluginReactHooks.configs.flat.recommended,
      pluginReactRefresh.configs.vite,
      eslintConfigPrettier,
      eslintPluginPrettier,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    rules: {
      "@typescript-eslint/array-type": ["error", { default: "array", readonly: "array" }],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/order": "off",
      "sort-imports": "off",
      "import/no-cycle": "off",
      "prettier/prettier": ["error", prettierConfig],
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "always",
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": "error",
      "@typescript-eslint/require-await": "off",
      "pnpm/json-enforce-catalog": "off",
    },
  },
  // https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router
  {
    files: ["src/app/routes/**/*.{ts,tsx}"],
    plugins: { "@tanstack/router": pluginRouter },
    rules: {
      "@tanstack/router/create-route-property-order": "warn",
      "@tanstack/router/route-param-names": "error",
      "react-refresh/only-export-components": ["off"],
    },
  },
  eslintBoundariesConfig,
]);
