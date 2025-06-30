import { schemaValidation } from "@/shared/lib/schema-validation";
import { Slug } from "@/shared/types/slug";

export const TaskDomainSchema = schemaValidation.object({
  id: schemaValidation.uuid(),
  slug: schemaValidation.custom<Slug>(),
  serialNumber: schemaValidation.number(),
  title: schemaValidation.string(),
  description: schemaValidation.string().optional(),
  completed: schemaValidation.boolean(),
  createdAt: schemaValidation.date(),
  updatedAt: schemaValidation.date(),
});

export type TaskDomain = schemaValidation.output<typeof TaskDomainSchema>;
