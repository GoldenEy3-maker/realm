import { generateUniqueUsername } from "./generate-unique-username.util";

describe("generateUniqueUsername", () => {
  it("should generate a username with correct format", () => {
    const username = generateUniqueUsername();
    expect(username).toMatch(/^user\.\d{6}$/);
  });

  it("should generate mostly unique usernames in a set", () => {
    const usernames = new Set();

    for (let i = 0; i < 100; i++) {
      usernames.add(generateUniqueUsername());
    }

    // Should have at least 90% uniqueness (accounting for potential collisions in fast execution)
    expect(usernames.size).toBeGreaterThanOrEqual(90);
  });
});
