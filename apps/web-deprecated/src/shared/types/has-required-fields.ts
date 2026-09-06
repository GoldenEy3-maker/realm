import type { RequiredKeys } from "./required-keys";

/**
 * Checks if a type has any required fields
 */
export type HasRequiredFields<T> = RequiredKeys<T> extends never ? false : true;
