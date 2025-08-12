import { type ValueOf } from "../types/value-of";

export const QueryKeyMap = {
  TASKS: "tasks",
  SESSION: "session",
  ORGANIZATIONS: "organizations",
  PROFILE: "profile",
} as const;

export type QueryKeyMap = ValueOf<typeof QueryKeyMap>;
