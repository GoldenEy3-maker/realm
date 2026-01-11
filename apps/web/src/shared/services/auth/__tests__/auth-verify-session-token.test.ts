import { describe, expect, it } from "vitest";

import { type AuthConfig } from "../config/auth-config";
import { type AuthSessionTokens } from "../model/auth-session-tokens-schema";
import { AuthService } from "../server/auth-service";

const baseConfig: AuthConfig = {
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60,
    sameSite: "lax",
  },
  tokenOptions: {
    alg: "HS256",
    secret: "secret",
    encryption: "wfhXV38dbLpa/3xeDGX9/dzT92rjV3WNVo6zrEBFbyI=",
  },
};

describe("AuthService.verifyTokenSession()", () => {
  it("should verify a valid session token", async () => {
    const payload: AuthSessionTokens = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const service = new AuthService(baseConfig);
    const token = await service.generateSessionToken(payload);
    const session = await service.verifySessionToken(token);
    expect(session).toStrictEqual(payload);
  });

  it("should return null if the token is invalid", async () => {
    const service = new AuthService(baseConfig);
    const session = await service.verifySessionToken("invalid");
    expect(session).toBeNull();
  });

  it("should return null if the token is signed with a different secret", async () => {
    const payload: AuthSessionTokens = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
    const otherSecretService = new AuthService({
      ...baseConfig,
      tokenOptions: { ...baseConfig.tokenOptions, secret: "invalid" },
    });
    const service = new AuthService(baseConfig);
    const token = await otherSecretService.generateSessionToken(payload);
    const session = await service.verifySessionToken(token);
    expect(session).toBeNull();
  });

  it("should return null if the token is expired", async () => {
    const payload: AuthSessionTokens = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
    const expiredService = new AuthService({
      ...baseConfig,
      cookieOptions: { ...baseConfig.cookieOptions, maxAge: -1 },
    });
    const service = new AuthService(baseConfig);
    const token = await expiredService.generateSessionToken(payload);
    const session = await service.verifySessionToken(token);
    expect(session).toBeNull();
  });
});
