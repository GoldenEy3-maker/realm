import { hashEncode } from "../hash";
import { type AuthConfig } from "./auth-config";

export function encodeSessionToken(sessionToken: string, config: AuthConfig) {
  return hashEncode(sessionToken, config.sessionSalt);
}
