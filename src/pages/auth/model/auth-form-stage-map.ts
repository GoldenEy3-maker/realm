import { schemaValidation } from "@/shared/lib/schema-validation";
import { type ValueOf } from "@/shared/types/value-of";

export const AuthFormStageMap = {
  EMAIL: "email",
  CODE: "code",
} as const;

export type AuthFormStageMap = ValueOf<typeof AuthFormStageMap>;

export const authFormStageMapSchema = schemaValidation.enum(
  Object.values(AuthFormStageMap),
);
