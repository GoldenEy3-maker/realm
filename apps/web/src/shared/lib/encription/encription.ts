import { createServerOnlyFn } from "@tanstack/react-start";
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

import type { Secret } from "@/shared/types/secret";

import { Logger } from "../logger";
import type { EncriptionOptions } from "./encription-options";

export class Encription {
  options: EncriptionOptions;

  constructor(options: Partial<EncriptionOptions> = {}) {
    const algorithm = options.algorithm ?? "aes-256-cbc";
    const ivLength = this.getIvLength(algorithm);

    this.options = {
      algorithm,
      iv: options.iv ?? createServerOnlyFn(() => randomBytes(ivLength))(),
      inputEncoding: options.inputEncoding ?? "utf8",
      outputEncoding: options.outputEncoding ?? "hex",
      encoding: options.encoding ?? "base64",
    };
  }

  /**
   * Encrypt data with a secret key
   * @param data - data to encrypt
   * @param secret - secret key to encrypt
   * @returns encrypted data in base64 format with salt and IV prepended
   */
  public encrypt = createServerOnlyFn((data: string, secret: Secret) => {
    // Generate a cryptographically secure random salt for each encryption
    const salt = randomBytes(16);

    const keyLength = this.getKeyLength(this.options.algorithm);
    const key = this.deriveKey(secret, keyLength, salt);

    const cipher = createCipheriv(this.options.algorithm, key, this.options.iv);

    let encrypted = cipher.update(data, this.options.inputEncoding, this.options.outputEncoding);

    encrypted += cipher.final(this.options.outputEncoding);

    // Store salt + IV + encrypted data together
    return Buffer.concat([
      salt,
      this.options.iv,
      Buffer.from(encrypted, this.options.outputEncoding),
    ]).toString(this.options.encoding);
  });

  /**
   * Decrypt data with a secret key
   * @param encryptedData - encrypted data in base64 format with salt and IV prepended
   * @param secret - secret key to decrypt
   * @returns decrypted data
   */
  public decrypt = createServerOnlyFn((encryptedData: string, secret: Secret) => {
    try {
      const buffer = Buffer.from(encryptedData, this.options.encoding);

      // Extract salt (first 16 bytes)
      const salt = buffer.subarray(0, 16);

      // Extract IV (next ivLength bytes)
      const ivLength = this.getIvLength(this.options.algorithm);
      const iv = buffer.subarray(16, 16 + ivLength);

      // The rest is encrypted data
      const encrypted = buffer.subarray(16 + ivLength).toString(this.options.outputEncoding);

      const keyLength = this.getKeyLength(this.options.algorithm);
      const key = this.deriveKey(secret, keyLength, salt);

      const decipher = createDecipheriv(this.options.algorithm, key, iv);
      let decrypted = decipher.update(
        encrypted,
        this.options.outputEncoding,
        this.options.inputEncoding,
      );
      decrypted += decipher.final(this.options.inputEncoding);

      return decrypted;
    } catch (error) {
      Logger.error("Failed to decrypt data:", error);
      return null;
    }
  });

  /**
   * Derive a cryptographic key of the specified length from a secret
   * @param secret - the secret to derive key from
   * @param keyLength - the desired key length in bytes
   * @param salt - cryptographically secure random salt
   * @returns Buffer containing the derived key
   */
  private deriveKey = createServerOnlyFn(
    (secret: Secret, keyLength: number, salt: Buffer): Buffer => {
      // Use scrypt to derive a key of the exact length needed
      // scrypt is a password-based key derivation function that's resistant to attacks
      // Using a unique salt for each encryption prevents rainbow table attacks
      return scryptSync(secret, salt, keyLength);
    },
  );

  private getKeyLength(algorithm: string) {
    if (algorithm.startsWith("aes-") || algorithm.startsWith("camellia-")) {
      if (algorithm.includes("256")) return 32;
      if (algorithm.includes("192")) return 24;
      return 16;
    }

    if (algorithm === "chacha20-poly1305") return 32;

    if (algorithm === "des-cbc") return 8;
    if (algorithm === "des-ede3-cbc") return 24;

    if (algorithm === "bf-cbc" || algorithm === "cast5-cbc") return 16;

    return 16;
  }

  private getIvLength(algorithm: string) {
    if (algorithm === "chacha20-poly1305") return 12;

    if (algorithm.startsWith("des-") || algorithm === "bf-cbc" || algorithm === "cast5-cbc") {
      return 8;
    }

    // AES, Camellia, and most other algorithms use 16-byte IV
    return 16;
  }
}
