import { createCipheriv } from "crypto";

import { getKeyLength } from "./get-key-length";
import { getOptions } from "./get-options";
import { type EncriptionOptions } from "./options";

/**
 * Encrypt data with a secret key
 * @param data - data to encrypt
 * @param secret - secret key to encrypt
 * @returns encrypted data in base64 format
 */
export function encrypt(
  data: string,
  secret: string,
  options: Partial<EncriptionOptions> = {},
): string {
  const { algorithm, iv, inputEncoding, outputEncoding, encoding } =
    getOptions(options);

  const keyLength = getKeyLength(algorithm);

  const cipher = createCipheriv(
    algorithm,
    Buffer.from(secret.slice(0, keyLength)),
    iv,
  );
  let encrypted = cipher.update(data, inputEncoding, outputEncoding);
  encrypted += cipher.final(outputEncoding);

  return Buffer.concat([iv, Buffer.from(encrypted, outputEncoding)]).toString(
    encoding,
  );
}
