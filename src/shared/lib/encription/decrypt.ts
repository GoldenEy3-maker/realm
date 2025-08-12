import { createDecipheriv } from "crypto";

import { type Secret } from "@/shared/types/secret";

import { Logger } from "../logger";
import { getIvLength } from "./get-iv-length";
import { getKeyLength } from "./get-key-length";
import { getOptions } from "./get-options";
import { type EncriptionOptions } from "./options";

/**
 * Decrypt data with a secret key
 * @param encryptedData - encrypted data in base64 format
 * @param secret - secret key to decrypt
 * @returns decrypted data
 */
export function decrypt(
  encryptedData: string,
  secret: Secret,
  options: Partial<EncriptionOptions> = {},
): string | null {
  const { algorithm, inputEncoding, outputEncoding, encoding } =
    getOptions(options);

  try {
    const buffer = Buffer.from(encryptedData, encoding);
    const ivLength = getIvLength(algorithm);

    const iv = buffer.subarray(0, ivLength);
    const encrypted = buffer.subarray(ivLength).toString(outputEncoding);

    const keyLength = getKeyLength(algorithm);

    const decipher = createDecipheriv(
      algorithm,
      Buffer.from(secret.slice(0, keyLength)),
      iv,
    );
    let decrypted = decipher.update(encrypted, outputEncoding, inputEncoding);
    decrypted += decipher.final(inputEncoding);

    return decrypted;
  } catch (error) {
    Logger.error("Failed to decrypt data:", error);
    return null;
  }
}
