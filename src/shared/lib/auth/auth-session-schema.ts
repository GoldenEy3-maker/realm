import { schemaValidation } from "../schema-validation";

export const authSessionSchema = schemaValidation.object({
  user: schemaValidation.object({
    id: schemaValidation.uuid(),
    email: schemaValidation.string(),
    username: schemaValidation.string().nullable(),
  }),
  version: schemaValidation.number(),
});

export type AuthSession = schemaValidation.infer<typeof authSessionSchema>;
