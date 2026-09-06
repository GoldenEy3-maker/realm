import { decodeJsUnicodeEntities } from "./decodeJsUnicodeEntities";
import { tp } from "./tp";

interface ApplyTypografOptions {
  /** String transformer applied after typograf processing, before tooltip rendering */
  middleware?: (text: string) => string;
}

/**
 * Applies typographic rules and returns a plain string.
 * Use for string props (labels, titles passed to child components).
 */
export const typografText = (text: string, options?: ApplyTypografOptions): string => {
  let processed = decodeJsUnicodeEntities(tp.execute(text));

  if (options?.middleware) {
    processed = options.middleware(processed);
  }

  return processed;
};
