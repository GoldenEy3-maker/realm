import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { serverEnv } from "@/shared/env/server";

const pool = new Pool({
  connectionString: serverEnv.DATABASE_URL,
});

export const db = drizzle({
  client: pool,
  logger: serverEnv.NODE_ENV === "development",
});

export { redis } from "./redis";
