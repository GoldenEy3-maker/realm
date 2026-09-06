import { keyframeSelectorKeywords, namedTimelineRangeKeywords } from "../reference/keywords.mjs";

// Regular expression for checking named timeline ranges with percentages
// Examples: "entry 0%", "exit 100%", "cover 50%"
// Needed for supporting new CSS specifications with named timeline ranges
const HAS_TIMELINE_RANGE = new RegExp(
  `^(?:${[...namedTimelineRangeKeywords.values()].join("|")})\\s+(?:\\d+|\\d*\\.\\d+)%$`,
  "i",
);

// Regular expression for checking percentage values in keyframes
// Examples: "0%", "50%", "100%", "25.5%"
// Needed for determining standard percentage selectors in @keyframes
const PERCENTAGE_SELECTOR = /^(?:\d+|\d*\.\d+)%$/;

/**
 * Check whether a string is a keyframe selector.
 *
 * @param {string} selector
 * @returns {boolean}
 */
const isKeyframeSelector = (selector) => {
  if (keyframeSelectorKeywords.has(selector)) {
    return true;
  }

  // Percentages
  if (PERCENTAGE_SELECTOR.test(selector)) {
    return true;
  }

  if (HAS_TIMELINE_RANGE.test(selector)) {
    return true;
  }

  return false;
};

export default isKeyframeSelector;
