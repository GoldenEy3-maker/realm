import { schemaValidation } from "@/shared/lib/schema-validation";

import type { ProfileRawModel } from "./profile-raw-model";

export const profileDtoSchema = schemaValidation.custom<ProfileRawModel>();

export type ProfileDto = schemaValidation.infer<typeof profileDtoSchema>;
