/** @type {import('stylelint').Config} */
export default {
  extends: [
    // "stylelint-config-standard",
    // "stylelint-config-standard-scss",
    "stylelint-config-recommended",
    "stylelint-config-recommended-scss",
    // "stylelint-config-idiomatic-order",
    // "stylelint-config-hudochenkov/full",
    // "stylelint-config-recess-order",
    // "stylelint-config-property-sort-order-smacss",
    "stylelint-config-clean-order",
  ],
  rules: {
    "lightness-notation": "number",
    "hue-degree-notation": "number",
    "import-notation": null,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          /** tailwindcss v4 */
          "theme",
          "source",
          "utility",
          "variant",
          "custom-variant",
          "plugin",
          /** tailwindcss v3 */
          "tailwind",
          "apply",
          "layer",
          "config",
          /** tailwindcss v1, v2 */
          "variants",
          "responsive",
          "screen",
          /** sass */
          "use",
          "if",
          "else",
        ],
      },
    ],
    "function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme"],
      },
    ],
    "scss/at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          /** tailwindcss v4 */
          "theme",
          "source",
          "utility",
          "variant",
          "custom-variant",
          "plugin",
          /** tailwindcss v3 */
          "tailwind",
          "apply",
          "layer",
          "config",
          /** tailwindcss v1, v2 */
          "variants",
          "responsive",
          "screen",
          /** sass */
          "use",
          "if",
          "else",
        ],
      },
    ],
    "scss/function-no-unknown": [
      true,
      {
        ignoreFunctions: ["theme"],
      },
    ],
    "at-rule-no-deprecated": [true, { ignoreAtRules: ["apply"] }],
  },
};
