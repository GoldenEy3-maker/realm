// Regular expression for checking postcss-simple-vars interpolation syntax
// Examples: "$(variable)", "$(my-color)", "$(font-size)"
// Needed for detecting postcss-simple-vars variable interpolation in CSS
const HAS_PSV_INTERPOLATION = /\$\(.+?\)/;

/**
 * Check whether a string has postcss-simple-vars interpolation
 *
 * @param {string} string
 * @returns {boolean}
 */
const hasPsvInterpolation = (string) => HAS_PSV_INTERPOLATION.test(string);

export default hasPsvInterpolation;
