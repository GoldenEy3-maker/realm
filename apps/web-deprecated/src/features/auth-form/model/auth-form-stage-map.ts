import { type ValueOf } from "@/shared/types/value-of";

export const AuthFormStageMap = {
  EMAIL: "email",
  CODE: "code",
} as const;

export type AuthFormStageMap = ValueOf<typeof AuthFormStageMap>;
