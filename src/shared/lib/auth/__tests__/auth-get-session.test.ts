import { getCookie } from "@tanstack/react-start/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { STATIC_UUID } from "@/shared/constants/static-uuid";

import { authConfig } from "../auth-config";
import { encodeSessionToken } from "../auth-encode-session-token";
import { generateSessionToken } from "../auth-generate-session-token";
import { getSession } from "../auth-get-session";
import { type AuthSession } from "../auth-session-schema";

vi.mock("@tanstack/react-start/server", () => ({
  getCookie: vi.fn(),
}));

describe("getSession()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return the session when valid cookie is present", async () => {
    const payload: AuthSession = {
      user: { id: STATIC_UUID },
      version: 1,
    };
    const sessionToken = await generateSessionToken(payload, authConfig);
    const hashedToken = encodeSessionToken(sessionToken, authConfig);

    vi.mocked(getCookie).mockReturnValue(hashedToken);

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.sessionCookieName);
    expect(session).toStrictEqual(payload);
  });

  it("should return null when no cookie is present", async () => {
    vi.mocked(getCookie).mockReturnValue(undefined);

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.sessionCookieName);
    expect(session).toBeNull();
  });

  it("should return null when cookie is empty string", async () => {
    vi.mocked(getCookie).mockReturnValue("");

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.sessionCookieName);
    expect(session).toBeNull();
  });

  it("should return null when cookie contains invalid token", async () => {
    vi.mocked(getCookie).mockReturnValue("invalid-token");

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.sessionCookieName);
    expect(session).toBeNull();
  });

  it("should return null when token is expired", async () => {
    const payload: AuthSession = {
      user: { id: STATIC_UUID },
      version: 1,
    };
    const expiredToken = await generateSessionToken(payload, {
      ...authConfig,
      sessionCookieOptions: {
        ...authConfig.sessionCookieOptions,
        maxAge: -1,
      },
    });
    const hashedExpiredToken = encodeSessionToken(expiredToken, authConfig);

    vi.mocked(getCookie).mockReturnValue(hashedExpiredToken);

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.sessionCookieName);
    expect(session).toBeNull();
  });
});
