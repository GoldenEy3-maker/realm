import { generateVerificationCode } from "./generate-code.util";

describe("generateVerificationCode", () => {
  it("should generate a 6-digit code", () => {
    const code = generateVerificationCode(6);
    expect(code).toHaveLength(6);
    expect(Number(code)).toBeGreaterThanOrEqual(100000);
    expect(Number(code)).toBeLessThanOrEqual(999999);
  });

  it("should generate only numeric characters", () => {
    const code = generateVerificationCode(6);
    expect(code).toMatch(/^\d+$/);
  });

  it("should generate different codes on multiple calls", () => {
    const codes = new Set();
    for (let i = 0; i < 100; i++) {
      codes.add(generateVerificationCode(6));
    }
    expect(codes.size).toBeGreaterThan(90);
  });
});
