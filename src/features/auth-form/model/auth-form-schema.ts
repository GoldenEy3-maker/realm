import { CommonUIMessages } from "@/shared/constants/common-ui-messages";
import { schemaValidation } from "@/shared/lib/schema-validation";

export const authFormSchema = schemaValidation.object({
  email: schemaValidation.email({ error: CommonUIMessages.INVALID_EMAIL }),
  code: schemaValidation.string({ error: CommonUIMessages.INVALID_CODE }),
});

export type AuthFormSchema = schemaValidation.infer<typeof authFormSchema>;
