// Regular expression for checking Less interpolation syntax
// Examples: "@{variable}", "@{my-color}", "@{font-size}"
// Needed for detecting Less variable interpolation in CSS/Less files
const HAS_LESS_INTERPOLATION = /@\{.+?\}/;

/**
 * Check whether a string has less interpolation
 *
 * @param {string} string
 * @returns {boolean} If `true`, a string has less interpolation
 */
const hasLessInterpolation = (string) => HAS_LESS_INTERPOLATION.test(string);

export default hasLessInterpolation;
