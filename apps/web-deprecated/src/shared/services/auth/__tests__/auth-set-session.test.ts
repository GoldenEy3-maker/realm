import { setCookie } from "@tanstack/react-start/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { type AuthConfig } from "../config/auth-config";
import { type AuthSessionTokens } from "../model/auth-session-tokens-schema";
import { AuthService } from "../server/auth-service";

vi.mock("@tanstack/react-start/server", () => ({
  setCookie: vi.fn(),
}));

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

describe("AuthService.setSession()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should set session cookie with valid payload", async () => {
    const payload: AuthSessionTokens = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const service = new AuthService(testConfig);

    await service.setSessionTokens(payload);

    expect(setCookie).toHaveBeenCalledWith(
      testConfig.cookieName,
      expect.any(String),
      testConfig.cookieOptions,
    );
  });

  it("should call setCookie only once per session", async () => {
    const payload: AuthSessionTokens = {
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
    const service = new AuthService(testConfig);

    await service.setSessionTokens(payload);

    expect(setCookie).toHaveBeenCalledTimes(1);
  });

  it("should set session cookie with loosely typed payload", async () => {
    const payload = {};
    const service = new AuthService(testConfig);

    // @ts-expect-error - Intentionally passing invalid shape
    await service.setSessionTokens(payload);

    expect(setCookie).toHaveBeenCalledWith(
      testConfig.cookieName,
      expect.any(String),
      testConfig.cookieOptions,
    );
  });
});
