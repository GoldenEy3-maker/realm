import { ValueOf } from "../types/value-of";

export const QueryKeyMap = {
  Tasks: "tasks",
} as const;

export type QueryKeyMap = ValueOf<typeof QueryKeyMap>;
