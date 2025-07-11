import { describe, expect, it } from "vitest";

import { STATIC_UUID } from "@/shared/constants/static-uuid";

import { schemaValidation } from "../../schema-validation";
import { authConfig } from "../auth-config";
import { generateSessionToken } from "../auth-generate-session-token";
import { AuthSession } from "../auth-session-schema";

describe("generateSessionToken()", () => {
  it("should generate a session token", async () => {
    const payload: AuthSession = {
      user: { id: STATIC_UUID },
      version: 1,
    };

    const session = await generateSessionToken(payload, authConfig);

    const parsedSession = schemaValidation
      .jwt({ alg: authConfig.sessionTokenOptions.alg })
      .safeParse(session);

    expect(parsedSession.success).toBe(true);
    expect(parsedSession.data).toEqual(session);
  });

  it("should generate a session token with a different algorithm", async () => {
    const payload: AuthSession = {
      user: { id: STATIC_UUID },
      version: 1,
    };

    const session1 = await generateSessionToken(payload, {
      ...authConfig,
      sessionTokenOptions: { alg: "HS384" },
    });

    const session2 = await generateSessionToken(payload, {
      ...authConfig,
      sessionTokenOptions: { alg: "HS512" },
    });

    const parsedSession1 = schemaValidation
      .jwt({ alg: "HS384" })
      .safeParse(session1);

    const parsedSession2 = schemaValidation
      .jwt({ alg: "HS512" })
      .safeParse(session2);

    expect(parsedSession1.success).toBe(true);
    expect(parsedSession2.success).toBe(true);

    expect(parsedSession1.data).toEqual(session1);
    expect(parsedSession2.data).toEqual(session2);

    expect(parsedSession1.data).not.toEqual(parsedSession2.data);
  });

  it("should generate a session token with an invalid payload", async () => {
    const payload = {};

    // @ts-expect-error - This is a test
    const session = await generateSessionToken(payload, authConfig);

    const parsedSession = schemaValidation
      .jwt({ alg: authConfig.sessionTokenOptions.alg })
      .safeParse(session);

    expect(parsedSession.success).toBe(true);
    expect(parsedSession.data).toEqual(session);
  });
});
