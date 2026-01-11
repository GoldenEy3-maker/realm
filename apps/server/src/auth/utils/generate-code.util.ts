import { randomInt } from "node:crypto";

/**
 * Generates a cryptographically secure random numeric code
 * @param length - Length of the code
 * @returns Generated code as a string
 */
export function generateVerificationCode(length: number): string {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return randomInt(min, max + 1).toString();
}
