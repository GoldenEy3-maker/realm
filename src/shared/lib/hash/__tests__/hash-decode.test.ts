import { describe, expect, it } from "vitest";

import { hashDecode } from "../hash-decode";
import { hashEncode } from "../hash-encode";

describe("decode", () => {
  const testData =
    "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const testSalt = "my-secret-salt-123";

  it("should decode original data correctly", () => {
    const hashedData = hashEncode(testData, testSalt);
    const decodedData = hashDecode(hashedData, testSalt);

    expect(decodedData).toBe(testData);
  });

  it("should return null when trying to restore with wrong salt", () => {
    const wrongSalt = "wrong-salt";

    const hashedData = hashEncode(testData, testSalt);
    const decodedData = hashDecode(hashedData, wrongSalt);

    expect(decodedData).toBeNull();
  });

  it("should return null for invalid hashed data format", () => {
    const invalidHashedData = "invalid-format";

    const decodedData = hashDecode(invalidHashedData, testSalt);

    expect(decodedData).toBeNull();
  });

  it("should return null for different algorithm", () => {
    const hashedData = hashEncode(testData, testSalt, { algorithm: "sha256" });
    const decodedData = hashDecode(hashedData, testSalt, {
      algorithm: "sha512",
    });
    expect(decodedData).toBeNull();
  });

  it("should return null for different encoding", () => {
    const hashedData = hashEncode(testData, testSalt, { encoding: "hex" });
    const decodedData = hashDecode(hashedData, testSalt, {
      encoding: "base64",
    });
    expect(decodedData).toBeNull();
  });

  it("should return null for corrupted hashed data", () => {
    const hashedData = hashEncode(testData, testSalt);
    const corruptedData = hashedData.replace(":", "|");

    const decodedData = hashDecode(corruptedData, testSalt);

    expect(decodedData).toBeNull();
  });

  it("should restore empty string correctly", () => {
    const hashedEmpty = hashEncode("", testSalt);
    const decodedEmpty = hashDecode(hashedEmpty, testSalt);

    expect(decodedEmpty).toBe("");
  });

  it("should restore special characters correctly", () => {
    const specialData = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    const hashedSpecial = hashEncode(specialData, testSalt);
    const decodedSpecial = hashDecode(hashedSpecial, testSalt);

    expect(decodedSpecial).toBe(specialData);
  });
});
