import { describe, expect, it } from "vitest";

import { Encryption } from "../encryption";

describe("Encryption.encrypt()", () => {
  const testData =
    "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const secret = "HM+5Fm4tcybJxMhtlvxzwC/cma6OBxLA7v7i7+Km1Jg=";

  it("should encrypt data with secret and return different string", () => {
    const encryptedData = new Encryption().encrypt(testData, secret);

    expect(encryptedData).not.toBe(testData);
    expect(typeof encryptedData).toBe("string");
  });

  it("should produce different encrypted data for different algorithms", () => {
    const encryptedData1 = new Encryption({ algorithm: "aes-256-cbc" }).encrypt(
      testData,
      secret
    );
    const encryptedData2 = new Encryption({ algorithm: "aes-128-cbc" }).encrypt(
      testData,
      secret
    );

    expect(encryptedData1).not.toBe(encryptedData2);
  });

  it("should produce different encrypted data for different encodings", () => {
    const encryptedData1 = new Encryption({ encoding: "hex" }).encrypt(
      testData,
      secret
    );
    const encryptedData2 = new Encryption({ encoding: "base64" }).encrypt(
      testData,
      secret
    );
    expect(encryptedData1).not.toBe(encryptedData2);
  });

  it("should handle empty string", () => {
    const encryptedEmpty = new Encryption().encrypt("", secret);

    expect(encryptedEmpty).not.toBe("");
  });

  it("should handle special characters", () => {
    const specialData = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const encryptedSpecial = new Encryption().encrypt(specialData, secret);

    expect(encryptedSpecial).not.toBe(specialData);
  });
});
