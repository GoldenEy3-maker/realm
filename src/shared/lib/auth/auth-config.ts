import { serverEnv } from "@/shared/env/server";

import { IS_PROD } from "../../constants/is-prod";
import { type schemaValidation } from "../schema-validation";

export interface AuthConfig {
  sessionCookieName: string;
  sessionCookieOptions: {
    httpOnly: boolean;
    secure: boolean;
    maxAge: number;
    sameSite: "lax" | "strict" | "none";
  };
  sessionTokenOptions: {
    alg: schemaValidation.z.core.util.JWTAlgorithm;
  };
  sessionSecret: string;
  sessionSalt: string;
}

/**
 * @description
 * The default configuration for the auth system.
 *
 * @see {@link AuthConfig}
 */
export const authConfig: AuthConfig = {
  sessionCookieName: "session",
  sessionCookieOptions: {
    httpOnly: true,
    secure: IS_PROD,
    /** The maximum age of the session in seconds. */
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  },
  sessionTokenOptions: {
    alg: "HS256",
  },
  sessionSecret: serverEnv.SESSION_SECRET,
  sessionSalt: serverEnv.SESSION_SALT,
} as const;
