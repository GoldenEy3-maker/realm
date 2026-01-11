import { schemaValidation } from "@/shared/lib/schema-validation";

export const authSessionSchema = schemaValidation.object({
  _enc: schemaValidation.string(),
});

export type AuthSession = schemaValidation.infer<typeof authSessionSchema>;
