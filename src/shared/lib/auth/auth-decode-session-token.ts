import { hashDecode } from "../hash";
import { type AuthConfig } from "./auth-config";

export function decodeSessionToken(
  hashedSessionToken: string,
  config: AuthConfig,
) {
  return hashDecode(hashedSessionToken, config.sessionSalt);
}
