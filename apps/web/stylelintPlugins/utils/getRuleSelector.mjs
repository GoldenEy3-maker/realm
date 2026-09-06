/**
 * @param {import('postcss').Rule} ruleNode
 * @returns {string}
 */
const getRuleSelector = (ruleNode) => {
  const raws = ruleNode.raws;

  return (raws.selector && raws.selector.raw) || ruleNode.selector;
};

export default getRuleSelector;
