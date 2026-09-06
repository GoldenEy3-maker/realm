import { Logger } from "@/core/lib/logger";

/**
 * Decodes JS unicode escape sequences in a string.
 * Handles sequences like \u00A0, \u2013, etc.
 *
 * @param text - text with JS unicode escape sequences
 * @returns decoded text with actual unicode characters
 */
export const decodeJsUnicodeEntities = (text: string): string => {
  try {
    // Escape backslashes that are NOT part of unicode sequences (\uXXXX)
    // This regex looks for backslashes not followed by u and 4 hex digits
    const escaped = text
      .replace(/\\(?!u[0-9a-fA-F]{4})/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r");

    return JSON.parse(`"${escaped}"`) as string;
  } catch (error) {
    Logger.error("typograf: decodeJsUnicodeEntities failed", error);

    return text;
  }
};
