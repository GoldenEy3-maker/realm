import { describe, expect, it } from "vitest";

import { Encription } from "../encription";

describe("Encription.encrypt()", () => {
  const testData = "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const secret = "HM+5Fm4tcybJxMhtlvxzwC/cma6OBxLA7v7i7+Km1Jg=";

  it("should encrypt data with secret and return different string", () => {
    const encryptedData = new Encription().encrypt(testData, secret);

    expect(encryptedData).not.toBe(testData);
    expect(typeof encryptedData).toBe("string");
  });

  it("should produce different encrypted data for different algorithms", () => {
    const encryptedData1 = new Encription({ algorithm: "aes-256-cbc" }).encrypt(testData, secret);
    const encryptedData2 = new Encription({ algorithm: "aes-128-cbc" }).encrypt(testData, secret);

    expect(encryptedData1).not.toBe(encryptedData2);
  });

  it("should produce different encrypted data for different encodings", () => {
    const encryptedData1 = new Encription({ encoding: "hex" }).encrypt(testData, secret);
    const encryptedData2 = new Encription({ encoding: "base64" }).encrypt(testData, secret);
    expect(encryptedData1).not.toBe(encryptedData2);
  });

  it("should handle empty string", () => {
    const encryptedEmpty = new Encription().encrypt("", secret);

    expect(encryptedEmpty).not.toBe("");
  });

  it("should handle special characters", () => {
    const specialData = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const encryptedSpecial = new Encription().encrypt(specialData, secret);

    expect(encryptedSpecial).not.toBe(specialData);
  });
});
