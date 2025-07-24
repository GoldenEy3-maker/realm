import { schemaValidation } from "@/shared/lib/schema-validation";

export const authCodeTokenSchema = schemaValidation.object({
  email: schemaValidation.email({ error: "Неверный email!" }),
});

export type AuthCodeTokenSchema = schemaValidation.infer<
  typeof authCodeTokenSchema
>;
