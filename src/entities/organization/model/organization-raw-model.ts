import type { InferSelectModel } from "drizzle-orm";

import type { organizations } from "@/shared/db/schema/organizations";

export type OrganizationRawModel = InferSelectModel<typeof organizations>;
