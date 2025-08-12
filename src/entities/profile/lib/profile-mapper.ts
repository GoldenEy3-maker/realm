import { createAutoMapper } from "@/shared/lib/auto-mapper";

import { profileDomainSchema } from "../model/profile-domain";
import { profileDtoSchema } from "../model/profile-dto";

export const { map: profileDtoToDomain, mapArray: profileDtoToDomainArray } =
  createAutoMapper(profileDtoSchema, profileDomainSchema);
