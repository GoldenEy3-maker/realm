import { describe, expect, it } from "vitest";

import { hashEncode } from "../hash-encode";

describe("encode", () => {
  const testData =
    "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const testSalt = "my-secret-salt-123";

  it("should hash data with salt and return different string", () => {
    const hashedData = hashEncode(testData, testSalt);

    expect(hashedData).not.toBe(testData);
    expect(hashedData).toContain(":");
    expect(typeof hashedData).toBe("string");
  });

  it("should produce different hashes for different salts", () => {
    const salt1 = "salt-1";
    const salt2 = "salt-2";

    const hash1 = hashEncode(testData, salt1);
    const hash2 = hashEncode(testData, salt2);

    expect(hash1).not.toBe(hash2);
  });

  it("should produce same hash for same data and salt", () => {
    const hash1 = hashEncode(testData, testSalt);
    const hash2 = hashEncode(testData, testSalt);

    expect(hash1).toBe(hash2);
  });

  it("should produce different hashes for different algorithms", () => {
    const hash1 = hashEncode(testData, testSalt, { algorithm: "sha256" });
    const hash2 = hashEncode(testData, testSalt, { algorithm: "sha512" });

    expect(hash1).not.toBe(hash2);
  });

  it("should produce different hashes for different encodings", () => {
    const hash1 = hashEncode(testData, testSalt, { encoding: "hex" });
    const hash2 = hashEncode(testData, testSalt, { encoding: "base64" });
    expect(hash1).not.toBe(hash2);
  });

  it("should handle empty string", () => {
    const hashedEmpty = hashEncode("", testSalt);

    expect(hashedEmpty).not.toBe("");
    expect(hashedEmpty).toContain(":");
  });

  it("should handle special characters", () => {
    const specialData = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const hashedSpecial = hashEncode(specialData, testSalt);

    expect(hashedSpecial).not.toBe(specialData);
    expect(hashedSpecial).toContain(":");
  });
});
