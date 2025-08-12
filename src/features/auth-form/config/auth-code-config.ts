import { serverEnv } from "@/shared/env/server";
import { type schemaValidation } from "@/shared/lib/schema-validation";
import { type Secret } from "@/shared/types/secret";

import { AUTH_CODE_EXPIRATION_TIME } from "../constants/auth-code-expiration";

export interface AuthCodeConfig {
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

export const authCodeConfig: AuthCodeConfig = {
  cookieName: "act",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: AUTH_CODE_EXPIRATION_TIME,
    sameSite: "lax",
  },
  tokenOptions: {
    algorithm: "HS256",
    secret: serverEnv.AUTH_CODE_TOKEN_SECRET,
    expiresIn: AUTH_CODE_EXPIRATION_TIME,
  },
};
