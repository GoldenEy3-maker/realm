/**
 * Extracts required keys from an object type
 */
export type RequiredKeys<T> = {
  // eslint-disable-next-line -- {} is needed for empty type check
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
