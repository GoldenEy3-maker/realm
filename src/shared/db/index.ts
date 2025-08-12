import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { serverEnv } from "@/shared/env/server";

import * as organizations from "./schema/organizations";
import * as profiles from "./schema/profiles";
import * as tasks from "./schema/tasks";
import * as users from "./schema/users";

const pool = new Pool({
  connectionString: serverEnv.DATABASE_URL,
});

export const db = drizzle({
  client: pool,
  logger: serverEnv.NODE_ENV === "development",
  schema: { ...users, ...organizations, ...tasks, ...profiles },
});

export { redis } from "./redis";
