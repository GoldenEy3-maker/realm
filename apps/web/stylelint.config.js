/** @type {import('stylelint').Config} */
const config = {
  plugins: ['./stylelintPlugins/slabSelectorClassPattern.mjs'],
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-css-modules',
    // Can be used stylelint-config-clean-order/error variant, default is warning
    'stylelint-config-clean-order',
  ],
  rules: {
    'custom-property-empty-line-before': [
      'always',
      { ignore: ['after-custom-property', 'first-nested'] },
    ],
    // Can be used 'context' option to use more modern media range notation
    'media-feature-range-notation': 'prefix',
    // Disable built-in rule that conflicts with custom plugin
    'selector-class-pattern': null,
    // Use custom plugin to ignore global scope selectors
    'slab/selector-class-pattern': [
      '^[A-Z][a-zA-Z0-9]*(_[a-z][a-zA-Z0-9-]*)?$',
      {
        resolveNestedSelectors: true,
        message: (selector) =>
          `Expected class selector "${selector}" to be PascalCase with optional variant suffix (e.g., .Root_lg, .Root_ghost-foreground)`,
      },
    ],
    // 'lower' and 'upper' options are allowed but cuz we use custom functions as kebab-case, they will be marked as error for any option
    'function-name-case': null,
    'at-rule-empty-line-before': [
      'always',
      {
        ignore: ['first-nested'],
        ignoreAtRules: ['else', 'if', 'else if'],
      },
    ],
    'keyframes-name-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      {
        message: 'Expected keyframes name to be kebab-case',
      },
    ],
    'scss/at-mixin-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      {
        message: 'Expected mixin name to be kebab-case',
      },
    ],
    'scss/at-function-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      {
        message: 'Expected function name to be kebab-case',
      },
    ],
    'scss/dollar-variable-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$',
      {
        message: 'Expected variable name to be kebab-case',
      },
    ],
    // If need to use this rule, then need custom configuration of prettier to prevent wrapping lines in calc function
    'scss/operator-no-newline-after': null,
  },
};

export default config;
