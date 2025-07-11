import { schemaValidation } from "../schema-validation";

export const authSessionSchema = schemaValidation.object({
  user: schemaValidation.object({
    id: schemaValidation.uuid(),
  }),
  version: schemaValidation.number(),
});

export type AuthSession = schemaValidation.output<typeof authSessionSchema>;
