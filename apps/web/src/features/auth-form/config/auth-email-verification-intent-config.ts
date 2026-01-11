import { createServerOnlyFn } from "@tanstack/react-start";

import { serverEnv } from "@/shared/env/server";
import { type schemaValidation } from "@/shared/lib/schema-validation";
import { type Secret } from "@/shared/types/secret";

import { AUTH_EMAIL_VERIFICATION_INTENT_TOKEN_EXPIRATION_TIME } from "../constants/auth-email-verification-intent-token-expiration-time";

export interface AuthEmailVerificationIntentConfig {
  cookieName: string;
  cookieOptions: {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
    sameSite: CookieSameSite;
  };
  tokenOptions: {
    algorithm: schemaValidation.z.core.util.JWTAlgorithm;
    secret: Secret;
    expiresIn: number;
  };
}

const authEmailVerificationIntentConfig: AuthEmailVerificationIntentConfig = {
  cookieName: "aevit",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: AUTH_EMAIL_VERIFICATION_INTENT_TOKEN_EXPIRATION_TIME,
    sameSite: "lax",
  },
  tokenOptions: {
    algorithm: "HS256",
    secret: serverEnv.AUTH_CODE_TOKEN_SECRET,
    expiresIn: AUTH_EMAIL_VERIFICATION_INTENT_TOKEN_EXPIRATION_TIME,
  },
};

export const getAuthEmailVerificationIntentConfigServerFn = createServerOnlyFn(() => {
  return authEmailVerificationIntentConfig;
});
