import { Environment } from "@/shared/constants/environment";
import { serverEnv } from "@/shared/env/server";
import { type Secret } from "@/shared/types/secret";

import { type schemaValidation } from "../schema-validation";

export interface AuthConfig {
  cookieName: string;
  cookieOptions: {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
    sameSite: CookieSameSite;
  };
  tokenOptions: {
    alg: schemaValidation.z.core.util.JWTAlgorithm;
    secret: Secret;
    encryption: Secret;
  };
}

/**
 * @description
 * The default configuration for the auth system.
 *
 * @see {@link AuthConfig}
 */
export const authConfig: AuthConfig = {
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: Environment.IS_PROD,
    /** The maximum age of the session in seconds. */
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  },
  tokenOptions: {
    alg: "HS256",
    secret: serverEnv.SESSION_SECRET,
    /** The secret key for encrypting sensitive data. */
    encryption: serverEnv.SESSION_ENCRYPTION_SECRET,
  },
} as const;
