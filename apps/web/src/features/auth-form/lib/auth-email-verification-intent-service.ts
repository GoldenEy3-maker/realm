import { createServerOnlyFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { jwtVerify, SignJWT } from "jose";

import { Logger } from "@/shared/lib/logger";
import { millisecondsToSeconds } from "@/shared/lib/milleseconds-to-seconds";

import type { AuthEmailVerificationIntentConfig } from "../config/auth-email-verification-intent-config";
import {
  type AuthEmailVerificationIntentTokenSchema,
  authEmailVerificationIntentTokenSchema,
} from "../model/auth-email-verification-intent-token-schema";

export class AuthEmailVerificationIntentService {
  constructor(private readonly config: AuthEmailVerificationIntentConfig) {}

  public generateToken(payload: AuthEmailVerificationIntentTokenSchema) {
    const jwt = new SignJWT(payload)
      .setProtectedHeader({
        alg: this.config.tokenOptions.algorithm,
      })
      .setExpirationTime(millisecondsToSeconds(Date.now()) + this.config.tokenOptions.expiresIn);

    return jwt.sign(new TextEncoder().encode(this.config.tokenOptions.secret));
  }

  public setTokenCookie = createServerOnlyFn((token: string) => {
    return setCookie(this.config.cookieName, token, {
      httpOnly: this.config.cookieOptions.httpOnly,
      secure: this.config.cookieOptions.secure,
      maxAge: this.config.cookieOptions.maxAge,
      sameSite: this.config.cookieOptions.sameSite,
    });
  });

  public async verifyToken(token: string) {
    try {
      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(this.config.tokenOptions.secret),
      );

      return authEmailVerificationIntentTokenSchema.parse(payload);
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }
}
