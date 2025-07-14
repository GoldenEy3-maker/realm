import { IS_DEV } from "@/shared/constants/is-dev";

/**
 * Function to create an artificial delay only in dev mode
 *
 * @param ms - delay time in milliseconds
 * @returns Promise that resolves after the specified time (only in dev)
 */
export function devDelay(ms: number = 600): Promise<void> {
  if (!IS_DEV) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
