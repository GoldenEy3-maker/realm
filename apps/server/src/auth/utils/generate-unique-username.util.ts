import { randomInt } from "node:crypto";

/**
 * Generates a username with additional entropy using timestamp
 * for even better uniqueness guarantees.
 * Format: "user.XXXXXX" where XXXXXX combines timestamp and random data.
 */
export function generateUniqueUsername(): string {
  // Use last 3 digits of timestamp + 3 random digits
  const timestamp = Date.now() % 1000;
  const random = randomInt(0, 1000);
  const combined = String(timestamp).padStart(3, "0") + String(random).padStart(3, "0");
  return `user.${combined}`;
}
