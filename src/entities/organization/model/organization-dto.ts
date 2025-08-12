import { schemaValidation } from "@/shared/lib/schema-validation";

import { type OrganizationRawModel } from "./organization-raw-model";

export const organizationDtoSchema =
  schemaValidation.custom<OrganizationRawModel>();

export type OrganizationDto = schemaValidation.infer<
  typeof organizationDtoSchema
>;
