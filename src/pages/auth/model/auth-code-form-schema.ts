import { type schemaValidation } from "@/shared/lib/schema-validation";

import { authFormSchema } from "./auth-form-schema";

export const authCodeFormSchema = authFormSchema.pick({
  verificationCode: true,
});

export type AuthCodeFormSchema = schemaValidation.output<
  typeof authCodeFormSchema
>;
