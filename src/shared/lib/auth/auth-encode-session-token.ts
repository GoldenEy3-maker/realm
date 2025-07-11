import { hashEncode } from "../hash";
import { AuthConfig } from "./auth-config";

export function encodeSessionToken(sessionToken: string, config: AuthConfig) {
  return hashEncode(sessionToken, config.sessionSalt);
}
