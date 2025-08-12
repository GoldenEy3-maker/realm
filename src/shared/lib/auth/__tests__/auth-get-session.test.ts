import { getCookie } from "@tanstack/react-start/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { STATIC_UUID } from "@/shared/constants/static-uuid";

import { authConfig } from "../auth-config";
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
      user: { id: STATIC_UUID, email: "test@test.com", username: "test" },
      version: 1,
    };
    const sessionToken = await generateSessionToken(payload, authConfig);

    vi.mocked(getCookie).mockReturnValue(sessionToken);

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.cookieName);
    expect(session).toStrictEqual(payload);
  });

  it("should return null when no cookie is present", async () => {
    vi.mocked(getCookie).mockReturnValue(undefined);

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.cookieName);
    expect(session).toBeNull();
  });

  it("should return null when cookie is empty string", async () => {
    vi.mocked(getCookie).mockReturnValue("");

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.cookieName);
    expect(session).toBeNull();
  });

  it("should return null when cookie contains invalid token", async () => {
    vi.mocked(getCookie).mockReturnValue("invalid-token");

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.cookieName);
    expect(session).toBeNull();
  });

  it("should return null when token is expired", async () => {
    const payload: AuthSession = {
      user: { id: STATIC_UUID, email: "test@test.com", username: "test" },
      version: 1,
    };
    const expiredToken = await generateSessionToken(payload, {
      ...authConfig,
      cookieOptions: {
        ...authConfig.cookieOptions,
        maxAge: -1,
      },
    });

    vi.mocked(getCookie).mockReturnValue(expiredToken);

    const session = await getSession();

    expect(getCookie).toHaveBeenCalledWith(authConfig.cookieName);
    expect(session).toBeNull();
  });
});
