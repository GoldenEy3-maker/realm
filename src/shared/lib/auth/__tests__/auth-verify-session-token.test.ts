import { describe, expect, it } from "vitest";

import { STATIC_UUID } from "@/shared/constants/static-uuid";

import { authConfig } from "../auth-config";
import { generateSessionToken } from "../auth-generate-session-token";
import { type AuthSession } from "../auth-session-schema";
import { verifySessionToken } from "../auth-verify-token-session";

describe("verifySessionToken()", () => {
  it("should verify a session", async () => {
    const payload: AuthSession = {
      user: { id: STATIC_UUID, email: "test@test.com", username: "test" },
      version: 1,
    };
    const sessionToken = await generateSessionToken(payload, authConfig);
    const session = await verifySessionToken(sessionToken);
    expect(session).toStrictEqual(payload);
  });

  it("should return null if the session is invalid", async () => {
    const sessionToken = "invalid";
    const session = await verifySessionToken(sessionToken);
    expect(session).toBeNull();
  });

  it("should return null if the session is not valid secret", async () => {
    const sessionToken = await generateSessionToken(
      {
        user: { id: STATIC_UUID, email: "test@test.com", username: "test" },
        version: 1,
      },
      {
        ...authConfig,
        tokenOptions: { ...authConfig.tokenOptions, secret: "invalid" },
      },
    );
    const session = await verifySessionToken(sessionToken);
    expect(session).toBeNull();
  });

  it("should return null if the session is expired", async () => {
    const sessionToken = await generateSessionToken(
      {
        user: { id: STATIC_UUID, email: "test@test.com", username: "test" },
        version: 1,
      },
      {
        ...authConfig,
        cookieOptions: {
          ...authConfig.cookieOptions,
          maxAge: -1,
        },
      },
    );
    const session = await verifySessionToken(sessionToken);
    expect(session).toBeNull();
  });
});
