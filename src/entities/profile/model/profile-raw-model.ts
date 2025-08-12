import type { InferSelectModel } from "drizzle-orm";

import type { profiles } from "@/shared/db/schema/profiles";

export type ProfileRawModel = InferSelectModel<typeof profiles>;
