import { hashEncode } from "./hash-encode";
import { getOptions } from "./hash-get-options";
import { type HashOptions } from "./hash-options";

export function hashMatch(
  data: string,
  hashedData: string,
  salt: string,
  options: Partial<HashOptions> = {},
) {
  const optionsWithDefaults = getOptions(options);

  const newHash = hashEncode(data, salt, optionsWithDefaults);

  return newHash === hashedData;
}
