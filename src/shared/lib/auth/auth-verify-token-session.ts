import { jwtVerify } from "jose";

import { serverEnv } from "@/shared/env/server";

import { Logger } from "../logger";
import { AuthSession, authSessionSchema } from "./auth-session-schema";

export async function verifySessionToken(
  sessionToken: string,
): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify<AuthSession>(
      sessionToken,
      new TextEncoder().encode(serverEnv.SESSION_SECRET),
    );

    return authSessionSchema.parse(payload);
  } catch (error) {
    Logger.error(error);
    return null;
  }
}
