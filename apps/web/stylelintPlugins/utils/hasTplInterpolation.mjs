// Regular expression for checking JS template literal or HTML-like template interpolation
// Examples: "{variable}", "{user.name}", "{data.id}"
// Needed for detecting template interpolation in JS template literals or HTML templates
const HAS_TPL_INTERPOLATION = /\{.+?\}/s;

/**
 * Check whether a string has JS template literal interpolation or HTML-like template
 *
 * @param {string} string
 * @returns {boolean} If `true`, a string has template literal interpolation
 */
const hasTplInterpolation = (string) => HAS_TPL_INTERPOLATION.test(string);

export default hasTplInterpolation;
