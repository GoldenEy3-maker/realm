import { describe, expect, it } from "vitest";

import { encrypt } from "../encrypt";

describe("encrypt", () => {
  const testData =
    "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const secret = "HM+5Fm4tcybJxMhtlvxzwC/cma6OBxLA7v7i7+Km1Jg=";

  it("should encrypt data with secret and return different string", () => {
    const encryptedData = encrypt(testData, secret);

    expect(encryptedData).not.toBe(testData);
    expect(typeof encryptedData).toBe("string");
  });

  it("should produce different encrypted data for different algorithms", () => {
    const encryptedData1 = encrypt(testData, secret, {
      algorithm: "aes-256-cbc",
    });
    const encryptedData2 = encrypt(testData, secret, {
      algorithm: "aes-128-cbc",
    });

    expect(encryptedData1).not.toBe(encryptedData2);
  });

  it("should produce different encrypted data for different encodings", () => {
    const encryptedData1 = encrypt(testData, secret, { encoding: "hex" });
    const encryptedData2 = encrypt(testData, secret, { encoding: "base64" });
    expect(encryptedData1).not.toBe(encryptedData2);
  });

  it("should handle empty string", () => {
    const encryptedEmpty = encrypt("", secret);

    expect(encryptedEmpty).not.toBe("");
  });

  it("should handle special characters", () => {
    const specialData = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const encryptedSpecial = encrypt(specialData, secret);

    expect(encryptedSpecial).not.toBe(specialData);
  });
});
