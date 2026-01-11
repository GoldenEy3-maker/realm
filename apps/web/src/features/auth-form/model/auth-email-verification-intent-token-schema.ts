import { CommonUIMessages } from "@/shared/constants/common-ui-messages";
import { schemaValidation } from "@/shared/lib/schema-validation";

export const authEmailVerificationIntentTokenSchema = schemaValidation.object({
  email: schemaValidation.email({ error: CommonUIMessages.INVALID_EMAIL }),
  sentAt: schemaValidation.number(),
});

export type AuthEmailVerificationIntentTokenSchema = schemaValidation.infer<
  typeof authEmailVerificationIntentTokenSchema
>;
