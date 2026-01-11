import { schemaValidation } from "@/shared/lib/schema-validation";

export const authSessionTokensSchema = schemaValidation.object({
  accessToken: schemaValidation.string(),
  refreshToken: schemaValidation.string(),
});

export type AuthSessionTokens = schemaValidation.infer<typeof authSessionTokensSchema>;
