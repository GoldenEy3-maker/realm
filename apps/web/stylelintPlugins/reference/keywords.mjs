/** @type {ReadonlySet<string>} */
export const keyframeSelectorKeywords = new Set(["from", "to"]);

/**
 * @see https://drafts.csswg.org/scroll-animations-1/#view-progress-timelines
 * @type {ReadonlySet<string>}
 */
export const namedTimelineRangeKeywords = new Set([
  "contain",
  "cover",
  "entry",
  "entry-crossing",
  "exit",
  "exit-crossing",
]);
