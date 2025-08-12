import { schemaValidation } from "@/shared/lib/schema-validation";
import { type Slug } from "@/shared/types/slug";

export const taskDomainSchema = schemaValidation.object({
  id: schemaValidation.uuid(),
  slug: schemaValidation.custom<Slug>(),
  serialNumber: schemaValidation.number(),
  title: schemaValidation.string(),
  description: schemaValidation.string().nullable(),
  completed: schemaValidation.boolean(),
  createdAt: schemaValidation.date(),
  updatedAt: schemaValidation.date(),
});

export type TaskDomain = schemaValidation.infer<typeof taskDomainSchema>;
