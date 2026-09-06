import selectorParser from "postcss-selector-parser";

/**
 * @param {string} selector
 * @param {import('stylelint').PostcssResult} result
 * @param {import('postcss').Node} node
 * @param {(root: import('postcss-selector-parser').Root) => void} [callback] - Deprecated. It will be removed in the future.
 * @returns {import('postcss-selector-parser').Root | undefined}
 */
const parseSelector = (selector, result, node, callback) => {
  if (!selector) return undefined;

  try {
    if (callback) {
      // @ts-expect-error -- TS2322: Type 'string' is not assignable to type 'Root'.
      return selectorParser(callback).processSync(selector);
    }

    return selectorParser().astSync(selector);
  } catch (err) {
    result.warn(`Cannot parse selector (${err})`, { node, stylelintType: "parseError" });

    return undefined;
  }
};

export default parseSelector;
