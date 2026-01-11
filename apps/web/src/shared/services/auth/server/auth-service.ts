import { createServerOnlyFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import { jwtVerify, SignJWT } from "jose";

import { Encription } from "@/shared/lib/encription";
import { Logger } from "@/shared/lib/logger";
import { millisecondsToSeconds } from "@/shared/lib/milleseconds-to-seconds";

import { type AuthConfig } from "../config/auth-config";
import { authSessionSchema } from "../model/auth-session-schema";
import {
  type AuthSessionTokens,
  authSessionTokensSchema,
} from "../model/auth-session-tokens-schema";

export class AuthService {
  constructor(private readonly config: AuthConfig) {}

  getSessionTokens = createServerOnlyFn(() => {
    const tokens = getCookie(this.config.cookieName);
    if (!tokens) return null;
    return this.verifySessionToken(tokens);
  });

  setSessionTokens = createServerOnlyFn(async (tokens: AuthSessionTokens) => {
    const sessionToken = await this.generateSessionToken(tokens);
    setCookie(this.config.cookieName, sessionToken, this.config.cookieOptions);
  });

  destroySessionTokens = createServerOnlyFn(() => {
    deleteCookie(this.config.cookieName);
  });

  async verifySessionToken(token: string) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(this.config.tokenOptions.secret),
      );

      const { _enc } = authSessionSchema.parse(payload);

      const decryptedPrivatePayload = new Encription().decrypt(
        _enc,
        this.config.tokenOptions.encryption,
      );

      if (!decryptedPrivatePayload) throw new Error("Invalid session token");

      const session = {
        ...(JSON.parse(decryptedPrivatePayload) || {}),
      };

      return authSessionTokensSchema.parse(session);
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }

  generateSessionToken(payload: AuthSessionTokens) {
    const encryptedPrivatePayload = new Encription().encrypt(
      JSON.stringify(payload),
      this.config.tokenOptions.encryption,
    );

    const jwt = new SignJWT({ _enc: encryptedPrivatePayload })
      .setProtectedHeader({
        alg: this.config.tokenOptions.alg,
      })
      .setExpirationTime(millisecondsToSeconds(Date.now()) + this.config.cookieOptions.maxAge);

    return jwt.sign(new TextEncoder().encode(this.config.tokenOptions.secret));
  }
}
