import { createHmac } from "crypto";

import { getOptions } from "./hash-get-options";
import { HashOptions } from "./hash-options";

export function hashEncode(
  data: string,
  salt: string,
  options: Partial<HashOptions> = {},
) {
  const { algorithm, encoding } = getOptions(options);

  const hmac = createHmac(algorithm, salt);

  hmac.update(data);

  const hash = hmac.digest(encoding);

  return `${hash}:${Buffer.from(data).toString("base64")}`;
}
