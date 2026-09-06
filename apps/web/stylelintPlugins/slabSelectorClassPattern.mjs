// adapted from from https://github.com/stylelint/stylelint/issues/3259#issuecomment-1574604800
import resolveNestedSelector from "postcss-resolve-nested-selector";
import stylelint from "stylelint";

import getRuleSelector from "./utils/getRuleSelector.mjs";
import isKeyframeSelector from "./utils/isKeyframeSelector.mjs";
import isStandardSyntaxSelector from "./utils/isStandardSyntaxSelector.mjs";
import isStandardSyntaxRule from "./utils/isStandartSyntaxRule.mjs";
import parseSelector from "./utils/parseSelector.mjs";

const { utils, createPlugin } = stylelint;

const ruleName = "slab/selector-class-pattern";
const messages = utils.ruleMessages(ruleName, {
  expected: (actual, expected) => `Expected class name "${actual}" to match "${expected}"`,
});

/** @type {import('stylelint').Rule} */
const ruleFunction = (primary, options = {}) => {
  const pattern = typeof primary === "string" ? new RegExp(primary) : primary;
  const { resolveNestedSelectors = false } = options;

  return (root, result) => {
    const validOptions = utils.validateOptions(
      result,
      ruleName,
      {
        actual: primary,
        possible: [(value) => typeof value === "string" || value instanceof RegExp],
      },
      {
        actual: options,
        possible: {
          resolveNestedSelectors: [(value) => typeof value === "boolean"],
        },
        optional: true,
      },
    );

    if (!validOptions) {
      return;
    }

    /**
     * @param {import('postcss-selector-parser').Root} selectorNode
     * @param {import('postcss').Rule} ruleNode
     */
    const checkRule = (selectorNode, ruleNode) => {
      selectorNode.walkClasses((classNode) => {
        const { value, sourceIndex: index } = classNode;

        if (ruleNode.selector.trim() === ":global") {
          return;
        }

        let parent = ruleNode.parent;

        while (parent) {
          if (parent.type === "rule" && parent.selector.trim() === ":global") {
            return;
          }
          parent = parent.parent;
        }

        let node = classNode;
        let isInGlobalScope = false;

        while (node) {
          if (node.type === "pseudo") {
            if (node.value === ":global") {
              isInGlobalScope = true;
              break;
            } else if (node.value === ":local") {
              break;
            }
          }
          node = node.parent;
        }

        if (isInGlobalScope) {
          return;
        }
        if (pattern.test(value)) {
          return;
        }

        const selector = String(classNode).trim();
        const endIndex = index + selector.length;

        utils.report({
          ruleName,
          result,
          node: ruleNode,
          message: messages.expected,
          messageArgs: [selector, primary],
          index,
          endIndex,
        });
      });
    };

    root.walkRules((ruleNode) => {
      if (!isStandardSyntaxRule(ruleNode)) {
        return;
      }

      if (ruleNode.selectors.some(isKeyframeSelector)) {
        return;
      }

      if (resolveNestedSelectors && hasInterpolatingAmpersand(ruleNode.selector)) {
        for (const nestedSelector of resolveNestedSelector(getRuleSelector(ruleNode), ruleNode)) {
          if (!isStandardSyntaxSelector(nestedSelector)) {
            continue;
          }

          const selectorRoot = parseSelector(nestedSelector, result, ruleNode);

          if (selectorRoot) checkRule(selectorRoot, ruleNode);
        }
      } else {
        const selectorRoot = parseSelector(getRuleSelector(ruleNode), result, ruleNode);

        if (selectorRoot) checkRule(selectorRoot, ruleNode);
      }
    });
  };
};

/**
 * An "interpolating ampersand" means an "&" used to interpolate
 * within another simple selector, rather than an "&" that
 * stands on its own as a simple selector.
 *
 * @param {string} selector
 * @returns {boolean}
 */
const hasInterpolatingAmpersand = (selector) => {
  for (const [i, char] of Array.from(selector).entries()) {
    if (char !== "&") {
      continue;
    }

    const prevChar = selector.charAt(i - 1);

    if (prevChar && !isCombinator(prevChar)) {
      return true;
    }

    const nextChar = selector.charAt(i + 1);

    if (nextChar && !isCombinator(nextChar)) {
      return true;
    }
  }

  return false;
};

/**
 * @param {string} x
 * @returns {boolean}
 */
const isCombinator = (x) => /[\s+>~]/.test(x);

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;

export default createPlugin(ruleName, ruleFunction);
