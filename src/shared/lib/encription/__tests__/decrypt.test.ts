import { describe, expect, it } from "vitest";

import { decrypt } from "../decrypt";
import { encrypt } from "../encrypt";

describe("decrypt", () => {
  const testData =
    "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const secret = "96YXM3MRyfgj18KGr1kUb1kH+1poFlnOdR3+MCRAO7E=";

  it("should decrypt original data correctly", () => {
    const encryptedData = encrypt(testData, secret);
    const decryptedData = decrypt(encryptedData, secret);

    expect(decryptedData).toBe(testData);
  });

  it("should return null when trying to restore with wrong salt", () => {
    const wrongSecret = "96YXM3MRyf2j18KGr1kUb1kH+1poFlnOdR3+MCRAO7E=";

    const encryptedData = encrypt(testData, secret);
    const decryptedData = decrypt(encryptedData, wrongSecret);

    expect(decryptedData).toBeNull();
  });

  it("should return null for invalid hashed data format", () => {
    const invalidEncryptedData = "invalid-format";

    const decryptedData = decrypt(invalidEncryptedData, secret);

    expect(decryptedData).toBeNull();
  });

  it("should return null for different algorithm", () => {
    const encryptedData = encrypt(testData, secret, {
      algorithm: "aes-256-cbc",
    });
    const decryptedData = decrypt(encryptedData, secret, {
      algorithm: "aes-128-cbc",
    });
    expect(decryptedData).toBeNull();
  });

  it("should return null for different encoding", () => {
    const encryptedData = encrypt(testData, secret, { encoding: "hex" });
    const decryptedData = decrypt(encryptedData, secret, {
      encoding: "base64",
    });
    expect(decryptedData).toBeNull();
  });

  it("should return null for corrupted encrypted data", () => {
    const encryptedData = encrypt(testData, secret);
    const corruptedData = encryptedData.replace(/\+|\//g, "|");

    const decryptedData = decrypt(corruptedData, secret);

    expect(decryptedData).toBeNull();
  });

  it("should restore empty string correctly", () => {
    const encryptedEmpty = encrypt("", secret);
    const decryptedEmpty = decrypt(encryptedEmpty, secret);

    expect(decryptedEmpty).toBe("");
  });

  it("should restore special characters correctly", () => {
    const specialData = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const encryptedSpecial = encrypt(specialData, secret);
    const decryptedSpecial = decrypt(encryptedSpecial, secret);

    expect(decryptedSpecial).toBe(specialData);
  });
});
