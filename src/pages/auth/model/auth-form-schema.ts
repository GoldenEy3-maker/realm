import { schemaValidation } from "@/shared/lib/schema-validation";

export const authFormSchema = schemaValidation.object({
  email: schemaValidation.email({ error: "Неверный email!" }),
});

export type AuthFormSchema = schemaValidation.output<typeof authFormSchema>;
