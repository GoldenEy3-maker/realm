import { jwtVerify } from "jose";
import { describe, expect, it } from "vitest";

import { type AuthConfig } from "../config/auth-config";
import { type AuthSessionTokens } from "../model/auth-session-tokens-schema";
import { AuthService } from "../server/auth-service";

const testConfig: AuthConfig = {
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

describe("AuthService.generateSessionToken()", () => {
  it("should generate a valid JWT", async () => {
    const payload: AuthSessionTokens = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const service = new AuthService(testConfig);

    const token = await service.generateSessionToken(payload);

    expect(typeof token).toBe("string");

    const { protectedHeader } = await jwtVerify(
      token,
      new TextEncoder().encode(testConfig.tokenOptions.secret),
    );
    expect(protectedHeader.alg).toBe(testConfig.tokenOptions.alg);
  });

  it("should generate tokens with different algorithms", async () => {
    const payload: AuthSessionTokens = { accessToken: "accessToken", refreshToken: "refreshToken" };

    const service384 = new AuthService({
      ...testConfig,
      tokenOptions: { ...testConfig.tokenOptions, alg: "HS384" },
    });
    const service512 = new AuthService({
      ...testConfig,
      tokenOptions: { ...testConfig.tokenOptions, alg: "HS512" },
    });

    const token384 = await service384.generateSessionToken(payload);
    const token512 = await service512.generateSessionToken(payload);

    const verifyKey = new TextEncoder().encode(testConfig.tokenOptions.secret);
    const v384 = await jwtVerify(token384, verifyKey);
    const v512 = await jwtVerify(token512, verifyKey);

    expect(v384.protectedHeader.alg).toBe("HS384");
    expect(v512.protectedHeader.alg).toBe("HS512");
    expect(token384).not.toEqual(token512);
  });

  it("should generate a token even with loosely typed payload", async () => {
    const service = new AuthService(testConfig);
    const payload = {};
    // @ts-expect-error - Intentionally passing invalid shape, encryption still produces a token
    const token = await service.generateSessionToken(payload);

    expect(typeof token).toBe("string");
    await expect(
      jwtVerify(token, new TextEncoder().encode(testConfig.tokenOptions.secret)),
    ).resolves.toBeDefined();
  });
});
