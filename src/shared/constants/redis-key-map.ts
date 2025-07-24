import type { ValueOf } from "../types/value-of";

export const RedisKeyMap = {
  AUTH_CODE: "auth-code",
} as const;

export type RedisKeyMap = ValueOf<typeof RedisKeyMap>;
