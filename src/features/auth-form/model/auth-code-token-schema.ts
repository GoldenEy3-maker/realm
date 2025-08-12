import { CommonUIMessages } from "@/shared/constants/common-ui-messages";
import { schemaValidation } from "@/shared/lib/schema-validation";

export const authCodeTokenSchema = schemaValidation.object({
  email: schemaValidation.email({ error: CommonUIMessages.INVALID_EMAIL }),
});

export type AuthCodeTokenSchema = schemaValidation.infer<
  typeof authCodeTokenSchema
>;
