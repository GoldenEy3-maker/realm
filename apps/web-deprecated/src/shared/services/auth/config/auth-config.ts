import { createServerOnlyFn } from "@tanstack/react-start";

import { Environment } from "@/shared/constants/environment";
import { serverEnv } from "@/shared/env/server";
import type { schemaValidation } from "@/shared/lib/schema-validation";
import type { Secret } from "@/shared/types/secret";

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
const authConfig: AuthConfig = {
  cookieName: "session",
  cookieOptions: {
    httpOnly: true,
    secure: Environment.IS_PROD,
    /** The maximum age of the session in seconds. */
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: "lax",
  },
  tokenOptions: {
    alg: "HS256",
    secret: serverEnv.AUTH_JWT_SECRET,
    encryption: serverEnv.AUTH_JWT_ENCRYPTION_SECRET,
  },
} as const;

export const getAuthConfigServerFn = createServerOnlyFn(() => {
  return authConfig;
});
