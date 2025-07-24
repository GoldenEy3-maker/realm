import { setCookie } from "@tanstack/react-start/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { STATIC_UUID } from "@/shared/constants/static-uuid";

import { authConfig } from "../auth-config";
import { type AuthSession } from "../auth-session-schema";
import { setSession } from "../auth-set-session";

vi.mock("@tanstack/react-start/server", () => ({
  setCookie: vi.fn(),
}));

describe("setSession()", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should set session cookie with valid payload", async () => {
    const payload: AuthSession = {
      user: { id: STATIC_UUID },
      version: 1,
    };

    await setSession(payload);

    expect(setCookie).toHaveBeenCalledWith(
      authConfig.cookieName,
      expect.any(String),
      authConfig.cookieOptions,
    );
  });

  it("should call setCookie only once per session", async () => {
    const payload: AuthSession = {
      user: { id: STATIC_UUID },
      version: 1,
    };

    await setSession(payload);

    expect(setCookie).toHaveBeenCalledTimes(1);
  });

  it("should set session cookie with invalid payload", async () => {
    const payload = {};

    // @ts-expect-error - This is a test
    await setSession(payload);

    expect(setCookie).toHaveBeenCalledWith(
      authConfig.cookieName,
      expect.any(String),
      authConfig.cookieOptions,
    );
  });
});
