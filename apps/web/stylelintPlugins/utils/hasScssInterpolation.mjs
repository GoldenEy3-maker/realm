// Regular expression for checking SCSS interpolation syntax
// Examples: "#{variable}", "#{$my-color}", "#{$font-size}"
// Needed for detecting SCSS variable interpolation in CSS/SCSS files
const HAS_SCSS_INTERPOLATION = /#\{.+?\}/s;

/**
 * Check whether a string has scss interpolation
 *
 * @param {string} string
 * @returns {boolean}
 */
const hasScssInterpolation = (string) => HAS_SCSS_INTERPOLATION.test(string);

export default hasScssInterpolation;
