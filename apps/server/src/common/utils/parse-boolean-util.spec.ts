import { parseBoolean } from "./parse-boolean.util";

describe("parseBoolean", () => {
  it("should return true for 'true'", () => {
    expect(parseBoolean("true")).toBe(true);
  });

  it("should return false for 'false'", () => {
    expect(parseBoolean("false")).toBe(false);
  });

  it("should return true for true", () => {
    expect(parseBoolean(true)).toBe(true);
  });

  it("should return false for false", () => {
    expect(parseBoolean(false)).toBe(false);
  });

  it("should return true for 1", () => {
    expect(parseBoolean(1)).toBe(true);
  });

  it("should return false for 0", () => {
    expect(parseBoolean(0)).toBe(false);
  });
});
