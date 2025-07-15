import { type ValueOf } from "../types/value-of";

export const QueryKeyMap = {
  TASKS: "tasks",
  SESSION: "session",
} as const;

export type QueryKeyMap = ValueOf<typeof QueryKeyMap>;
