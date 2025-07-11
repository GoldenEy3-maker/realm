import { ValueOf } from "../types/value-of";

export const QueryKeyMap = {
  Tasks: "tasks",
  Session: "session",
} as const;

export type QueryKeyMap = ValueOf<typeof QueryKeyMap>;
