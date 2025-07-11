import { createHmac } from "crypto";

import { Logger } from "../logger";
import { getOptions } from "./hash-get-options";
import { HashOptions } from "./hash-options";

export function hashDecode(
  hashedData: string,
  salt: string,
  options: Partial<HashOptions> = {},
) {
  const { algorithm, encoding } = getOptions(options);

  try {
    const [hash, encodedData] = hashedData.split(":");

    if (!hash || encodedData === undefined) return null;

    const data = Buffer.from(encodedData, "base64").toString("utf-8");

    const hmac = createHmac(algorithm, salt);
    hmac.update(data);
    const expectedHash = hmac.digest(encoding);

    if (hash === expectedHash) return data;

    return null;
  } catch (error) {
    Logger.error(error);
    return null;
  }
}
