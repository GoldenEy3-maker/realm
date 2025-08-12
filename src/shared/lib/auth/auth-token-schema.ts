import { schemaValidation } from "../schema-validation";

export const authTokenSchema = schemaValidation.object({
  _enc: schemaValidation.string(),
});

export type AuthToken = schemaValidation.infer<typeof authTokenSchema>;
