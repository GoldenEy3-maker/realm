import { getCookie } from "@tanstack/react-start/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { type AuthConfig } from "../config/auth-config";
import { type AuthSessionTokens } from "../model/auth-session-tokens-schema";
import { AuthService } from "../server/auth-service";

vi.mock("@tanstack/react-start/server", () => ({
  getCookie: vi.fn(),
}));

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

describe("AuthService.getSession()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the session when valid cookie is present", async () => {
    const payload: AuthSessionTokens = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const service = new AuthService(baseConfig);
    const token = await service.generateSessionToken(payload);

    vi.mocked(getCookie).mockReturnValue(token);

    const tokens = await service.getSessionTokens();

    expect(getCookie).toHaveBeenCalledWith(baseConfig.cookieName);
    expect(tokens).toStrictEqual(payload);
  });

  it("should return null when no cookie is present", async () => {
    const service = new AuthService(baseConfig);
    vi.mocked(getCookie).mockReturnValue(undefined);

    const tokens = await service.getSessionTokens();

    expect(getCookie).toHaveBeenCalledWith(baseConfig.cookieName);
    expect(tokens).toBeNull();
  });

  it("should return null when cookie is empty string", async () => {
    const service = new AuthService(baseConfig);
    vi.mocked(getCookie).mockReturnValue("");

    const tokens = await service.getSessionTokens();

    expect(getCookie).toHaveBeenCalledWith(baseConfig.cookieName);
    expect(tokens).toBeNull();
  });

  it("should return null when cookie contains invalid token", async () => {
    const service = new AuthService(baseConfig);
    vi.mocked(getCookie).mockReturnValue("invalid-token");

    const tokens = await service.getSessionTokens();

    expect(getCookie).toHaveBeenCalledWith(baseConfig.cookieName);
    expect(tokens).toBeNull();
  });

  it("should return null when token is expired", async () => {
    const payload: AuthSessionTokens = { accessToken: "accessToken", refreshToken: "refreshToken" };
    const expiredConfig: AuthConfig = {
      ...baseConfig,
      cookieOptions: { ...baseConfig.cookieOptions, maxAge: -1 },
    };
    const service = new AuthService(baseConfig);
    const expiredToken = await new AuthService(expiredConfig).generateSessionToken(payload);

    vi.mocked(getCookie).mockReturnValue(expiredToken);

    const tokens = await service.getSessionTokens();

    expect(getCookie).toHaveBeenCalledWith(baseConfig.cookieName);
    expect(tokens).toBeNull();
  });
});
