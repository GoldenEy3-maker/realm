import { Environment } from "../constants/environment";

/**
 * Function to create an artificial delay only in dev mode
 *
 * @param ms - delay time in milliseconds (default: 600ms)
 * @returns Promise that resolves after the specified time (only in dev mode)
 */
export function devDelay(ms: number = 600): Promise<void> {
  if (Environment.IS_PROD) return Promise.resolve();

  return new Promise((resolve) => setTimeout(resolve, ms));
}
