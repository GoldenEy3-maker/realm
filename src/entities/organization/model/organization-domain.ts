import { schemaValidation } from "@/shared/lib/schema-validation";

export const organizationDomainSchema = schemaValidation.object({
  id: schemaValidation.uuid(),
  slug: schemaValidation.string(),
  name: schemaValidation.string(),
  description: schemaValidation.string().nullable(),
  logoUrl: schemaValidation.string().nullable(),
  websiteUrl: schemaValidation.string().nullable(),
  authorId: schemaValidation.uuid(),
  createdAt: schemaValidation.date(),
  updatedAt: schemaValidation.date(),
});

export type OrganizationDomain = schemaValidation.infer<
  typeof organizationDomainSchema
>;
