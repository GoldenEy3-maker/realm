import { createClient } from "redis";

import { serverEnv } from "../env/server";
import { Logger } from "../lib/logger";

export const redis = createClient({
  url: serverEnv.REDIS_URL,
}).on("error", (error) => {
  Logger.error(error);
});
