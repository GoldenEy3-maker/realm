import { randomBytes } from "crypto";

import { getIvLength } from "./get-iv-length";
import { type EncriptionOptions } from "./options";

export function getOptions(
  options: Partial<EncriptionOptions> = {},
): EncriptionOptions {
  const algorithm = options.algorithm ?? "aes-256-cbc";
  const ivLength = getIvLength(algorithm);

  return {
    algorithm,
    iv: options.iv ?? randomBytes(ivLength),
    inputEncoding: options.inputEncoding ?? "utf8",
    outputEncoding: options.outputEncoding ?? "hex",
    encoding: options.encoding ?? "base64",
  };
}
