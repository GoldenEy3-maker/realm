import { createAutoMapper } from "@/shared/lib/auto-mapper";

import { organizationDomainSchema } from "../model/organization-domain";
import { organizationDtoSchema } from "../model/organization-dto";

const organizationAutoMapper = createAutoMapper(
  organizationDtoSchema,
  organizationDomainSchema,
);

export const {
  map: organizationDtoToDomain,
  mapArray: organizationDtoToDomainArray,
} = organizationAutoMapper;
