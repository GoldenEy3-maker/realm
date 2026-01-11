import { describe, expect, it } from "vitest";

import { Encription } from "../encription";

describe("Encription.decrypt()", () => {
  const testData = "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const secret = "96YXM3MRyfgj18KGr1kUb1kH+1poFlnOdR3+MCRAO7E=";

  it("should decrypt original data correctly", () => {
    const encription = new Encription();
    const encryptedData = encription.encrypt(testData, secret);
    const decryptedData = encription.decrypt(encryptedData, secret);

    expect(decryptedData).toBe(testData);
  });

  it("should return null when trying to restore with wrong salt", () => {
    const encription = new Encription();
    const wrongSecret = "96YXM3MRyf2j18KGr1kUb1kH+1poFlnOdR3+MCRAO7E=";

    const encryptedData = encription.encrypt(testData, secret);
    const decryptedData = encription.decrypt(encryptedData, wrongSecret);

    expect(decryptedData).toBeNull();
  });

  it("should return null for invalid hashed data format", () => {
    const invalidEncryptedData = "invalid-format";

    const decryptedData = new Encription().decrypt(invalidEncryptedData, secret);

    expect(decryptedData).toBeNull();
  });

  it("should return null for different algorithm", () => {
    const encryptedData = new Encription({ algorithm: "aes-256-cbc" }).encrypt(testData, secret);
    const decryptedData = new Encription({ algorithm: "aes-128-cbc" }).decrypt(
      encryptedData,
      secret,
    );
    expect(decryptedData).toBeNull();
  });

  it("should return null for different encoding", () => {
    const encryptedData = new Encription({ encoding: "hex" }).encrypt(testData, secret);
    const decryptedData = new Encription({ encoding: "base64" }).decrypt(encryptedData, secret);
    expect(decryptedData).toBeNull();
  });

  it("should return null for corrupted encrypted data", () => {
    const encription = new Encription();
    const encryptedData = encription.encrypt(testData, secret);
    const corruptedData = encryptedData.replace(/\+|\//g, "|");
    const decryptedData = encription.decrypt(corruptedData, secret);

    expect(decryptedData).toBeNull();
  });

  it("should restore empty string correctly", () => {
    const encription = new Encription();
    const encryptedEmpty = encription.encrypt("", secret);
    const decryptedEmpty = encription.decrypt(encryptedEmpty, secret);

    expect(decryptedEmpty).toBe("");
  });

  it("should restore special characters correctly", () => {
    const encription = new Encription();
    const specialData = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const encryptedSpecial = encription.encrypt(specialData, secret);
    const decryptedSpecial = encription.decrypt(encryptedSpecial, secret);

    expect(decryptedSpecial).toBe(specialData);
  });
});
