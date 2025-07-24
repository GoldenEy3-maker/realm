import { jwtVerify } from "jose";

import { decrypt } from "../encription";
import { Exception } from "../exception";
import { Logger } from "../logger";
import { authConfig } from "./auth-config";
import { type AuthSession, authSessionSchema } from "./auth-session-schema";
import { authTokenSchema } from "./auth-token-schema";

export async function verifySessionToken(
  sessionToken: string,
): Promise<AuthSession | null> {
  try {
    const { payload } = await jwtVerify(
      sessionToken,
      new TextEncoder().encode(authConfig.tokenOptions.secret),
    );

    const { _enc } = authTokenSchema.parse(payload);

    const decryptedPrivatePayload = decrypt(
      _enc,
      authConfig.tokenOptions.encryption,
    );

    if (!decryptedPrivatePayload) {
      throw Exception.codeError("Invalid session token");
    }

    const session = {
      ...(JSON.parse(decryptedPrivatePayload) || {}),
    };

    return authSessionSchema.parse(session);
  } catch (error) {
    Logger.error(error);
    return null;
  }
}
