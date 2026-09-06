import hasInterpolation from "./hasInterpolation.mjs";

// Regular expression for checking Less :extend() syntax
// Examples: ":extend(.class)", ":extend(.class all)"
// Needed for determining Less-specific selectors that are not standard CSS
const LESS_EXTEND_SELECTOR = /:extend(?:\(.*?\))?/;

// Regular expression for checking Less mixins with nested selectors
// Examples: ".foo().bar", ".foo(@a, @b)[bar]", ".mixin().nested"
// Needed for determining Less mixins that return selectors
const LESS_MIXIN_WITH_NESTED = /\.[\w-]+\(.*\).+/;

// Regular expression for checking Less parametric mixins
// Examples: ".mixin(@variable: x)", ".mixin(@param: value)"
// Needed for determining Less mixin definitions with parameters
const LESS_PARAMETRIC_MIXIN = /\(@.*\)$/;

/**
 * Check whether a selector is standard
 *
 * @param {string} selector
 * @returns {boolean}
 */
const isStandardSyntaxSelector = (selector) => {
  // SCSS or Less interpolation
  if (hasInterpolation(selector)) {
    return false;
  }

  // SCSS placeholder selectors
  if (selector.startsWith("%")) {
    return false;
  }

  // SCSS nested properties
  if (selector.endsWith(":")) {
    return false;
  }

  // Less :extend()
  if (LESS_EXTEND_SELECTOR.test(selector)) {
    return false;
  }

  // Less mixin with resolved nested selectors (e.g. .foo().bar or .foo(@a, @b)[bar])
  if (LESS_MIXIN_WITH_NESTED.test(selector)) {
    return false;
  }

  // Less non-outputting mixin definition (e.g. .mixin() {})
  if (selector.endsWith(")") && !selector.includes(":")) {
    return false;
  }

  // Less Parametric mixins (e.g. .mixin(@variable: x) {})
  if (LESS_PARAMETRIC_MIXIN.test(selector)) {
    return false;
  }

  // ERB template tags
  if (selector.includes("<%") || selector.includes("%>")) {
    return false;
  }

  //  SCSS and Less comments
  if (selector.includes("//")) {
    return false;
  }

  return true;
};

export default isStandardSyntaxSelector;
