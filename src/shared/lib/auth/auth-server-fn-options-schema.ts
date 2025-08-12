import { schemaValidation } from "../schema-validation";

export const authServerFnOptionsSchema = schemaValidation.object({
  shouldUpdateSession: schemaValidation.boolean().optional(),
});

export type AuthServerFnOptions = schemaValidation.infer<
  typeof authServerFnOptionsSchema
>;
