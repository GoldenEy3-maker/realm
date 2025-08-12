import { schemaValidation } from "@/shared/lib/schema-validation";

export const profileDomainSchema = schemaValidation.object({
  id: schemaValidation.uuid(),
  userId: schemaValidation.uuid(),
  firstName: schemaValidation.string(),
  lastName: schemaValidation.string(),
  middleName: schemaValidation.string().nullable(),
  avatarUrl: schemaValidation.string().nullable(),
  bio: schemaValidation.string().nullable(),
  dateOfBirth: schemaValidation.date().nullable(),
  createdAt: schemaValidation.date(),
  updatedAt: schemaValidation.date(),
});

export type ProfileDomain = schemaValidation.infer<typeof profileDomainSchema>;
