import { registerAs } from "@nestjs/config";
import { JwtExpiresInStringValue } from "../../common/types/jwt-expires-in-string-value.type";

export interface VerificationCodeConfig {
  maxAttempts: number;
  expirationTime: number;
  redisStorageKey: string;
  codeLength: number;
}

export interface JwtConfig {
  secret: string;
  accessTokenExpiresIn: JwtExpiresInStringValue;
  refreshTokenExpiresIn: JwtExpiresInStringValue;
}

interface AuthConfig {
  verificationCode: VerificationCodeConfig;
  jwt: JwtConfig;
}

export const authConfig = registerAs<AuthConfig>(
  "auth",
  () =>
    ({
      verificationCode: {
        /**
         * The expiration time of the verification code in seconds (5 minutes)
         */
        expirationTime: parseInt(process.env.AUTH_VERIFICATION_CODE_EXPIRATION_TIME || "300", 10),
        /**
         * The Redis storage key for the verification code
         */
        redisStorageKey: process.env.AUTH_VERIFICATION_CODE_REDIS_KEY || "verification-code",
        /**
         * The length of the verification code
         */
        codeLength: parseInt(process.env.AUTH_VERIFICATION_CODE_LENGTH || "6", 10),
        /**
         * The maximum number of attempts to enter the verification code
         */
        maxAttempts: parseInt(process.env.AUTH_VERIFICATION_CODE_MAX_ATTEMPTS || "3", 10),
      },
      jwt: {
        /**
         * JWT secret key - MUST be set in environment variables
         */
        secret: process.env.AUTH_JWT_SECRET!,
        /**
         * Access token expiration time (5 minutes)
         */
        accessTokenExpiresIn:
          (process.env.AUTH_JWT_ACCESS_TOKEN_EXPIRES_IN as JwtExpiresInStringValue) || "5m",
        /**
         * Refresh token expiration time (7 days)
         */
        refreshTokenExpiresIn:
          (process.env.AUTH_JWT_REFRESH_TOKEN_EXPIRES_IN as JwtExpiresInStringValue) || "7d",
      },
    }) satisfies AuthConfig,
);
