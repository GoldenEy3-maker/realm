import { type schemaValidation } from "@/shared/lib/schema-validation";

import { authFormSchema } from "./auth-form-schema";

export const authCodeFormSchema = authFormSchema.pick({
  code: true,
});

export type AuthCodeFormSchema = schemaValidation.infer<
  typeof authCodeFormSchema
>;
