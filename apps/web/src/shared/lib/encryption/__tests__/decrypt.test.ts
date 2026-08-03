import { describe, expect, it } from "vitest";

import { Encryption } from "../encryption";

describe("Encryption.decrypt()", () => {
  const testData =
    "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const secret = "96YXM3MRyfgj18KGr1kUb1kH+1poFlnOdR3+MCRAO7E=";

  it("should decrypt original data correctly", () => {
    const encryption = new Encryption();
    const encryptedData = encryption.encrypt(testData, secret);
    const decryptedData = encryption.decrypt(encryptedData, secret);

    expect(decryptedData).toBe(testData);
  });

  it("should return null when trying to restore with wrong salt", () => {
    const encryption = new Encryption();
    const wrongSecret = "96YXM3MRyf2j18KGr1kUb1kH+1poFlnOdR3+MCRAO7E=";

    const encryptedData = encryption.encrypt(testData, secret);
    const decryptedData = encryption.decrypt(encryptedData, wrongSecret);

    expect(decryptedData).toBeNull();
  });

  it("should return null for invalid hashed data format", () => {
    const invalidEncryptedData = "invalid-format";

    const decryptedData = new Encryption().decrypt(
      invalidEncryptedData,
      secret
    );

    expect(decryptedData).toBeNull();
  });

  it("should return null for different algorithm", () => {
    const encryptedData = new Encryption({ algorithm: "aes-256-cbc" }).encrypt(
      testData,
      secret
    );
    const decryptedData = new Encryption({ algorithm: "aes-128-cbc" }).decrypt(
      encryptedData,
      secret
    );
    expect(decryptedData).toBeNull();
  });

  it("should return null for different encoding", () => {
    const encryptedData = new Encryption({ encoding: "hex" }).encrypt(
      testData,
      secret
    );
    const decryptedData = new Encryption({ encoding: "base64" }).decrypt(
      encryptedData,
      secret
    );
    expect(decryptedData).toBeNull();
  });

  it("should return null for corrupted encrypted data", () => {
    const encryption = new Encryption();
    const encryptedData = encryption.encrypt(testData, secret);
    const corruptedData = encryptedData.replace(/\+|\//g, "|");
    const decryptedData = encryption.decrypt(corruptedData, secret);

    expect(decryptedData).toBeNull();
  });

  it("should restore empty string correctly", () => {
    const encryption = new Encryption();
    const encryptedEmpty = encryption.encrypt("", secret);
    const decryptedEmpty = encryption.decrypt(encryptedEmpty, secret);

    expect(decryptedEmpty).toBe("");
  });

  it("should restore special characters correctly", () => {
    const encryption = new Encryption();
    const specialData = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const encryptedSpecial = encryption.encrypt(specialData, secret);
    const decryptedSpecial = encryption.decrypt(encryptedSpecial, secret);

    expect(decryptedSpecial).toBe(specialData);
  });
});
