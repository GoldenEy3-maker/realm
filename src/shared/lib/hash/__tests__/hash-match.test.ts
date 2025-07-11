import { describe, expect, it } from "vitest";

import { hashEncode } from "../hash-encode";
import { hashMatch } from "../hash-match";

describe("match", () => {
  const testData =
    "Hello, World! This is a test string with special chars: !@#$%^&*()";
  const testSalt = "my-secret-salt-123";

  it("should return true for valid hash", () => {
    const hashedData = hashEncode(testData, testSalt);

    expect(hashMatch(testData, hashedData, testSalt)).toBe(true);
  });

  it("should return false for invalid hash with wrong salt", () => {
    const wrongSalt = "wrong-salt";
    const hashedData2 = hashEncode(testData, wrongSalt);

    expect(hashMatch(testData, hashedData2, testSalt)).toBe(false);
  });

  it("should return false for invalid format", () => {
    const invalidHashedData = "invalid-format";

    expect(hashMatch(invalidHashedData, testData, testSalt)).toBe(false);
  });

  it("should return false for corrupted data", () => {
    const hashedData = hashEncode(testData, testSalt);
    const corruptedData = hashedData.replace(":", "|");

    expect(hashMatch(corruptedData, testData, testSalt)).toBe(false);
  });
});
