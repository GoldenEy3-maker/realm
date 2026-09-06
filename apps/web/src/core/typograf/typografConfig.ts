import type { TypografPrefs } from "typograf";

/**
 * Shared configuration for Typograf instances
 * Used both in runtime (src) and build scripts
 */
export const typografConfig: TypografPrefs = {
  locale: ["ru"],
  htmlEntity: { type: "js" },
  disableRule: ["common/number/fraction"],
};
