import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginHooks from "eslint-plugin-react-hooks";
import pluginQuery from "@tanstack/eslint-plugin-query";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [".output", ".vinxi", "src/**/*.gen.ts"],
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...pluginQuery.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  {
    plugins: {
      "react-hooks": pluginHooks,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "with-single-extends",
        },
      ],
      ...pluginHooks.configs.recommended.rules,
    },
  },
];
