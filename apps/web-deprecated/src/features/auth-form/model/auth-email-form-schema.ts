import { type schemaValidation } from "@/shared/lib/schema-validation";

import { authFormSchema } from "./auth-form-schema";

export const authEmailFormSchema = authFormSchema.pick({ email: true });

export type AuthEmailFormSchema = schemaValidation.infer<typeof authEmailFormSchema>;
