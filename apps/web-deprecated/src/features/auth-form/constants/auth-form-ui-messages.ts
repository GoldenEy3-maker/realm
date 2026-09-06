export const AuthFormUIMessages = {
  EMAIL_CODE_SEND_SUCCESSFULLY: (email: string) => `Код для авторизации отправлен на ${email}`,
  EMAIL_CODE_SEND_ERROR: "Не удалось отправить код. Повторите попытку позже.",
  EMAIL_CODE_VERIFY_ERROR: "Не удалось верифицировать код. Повторите попытку позже.",
  REGISTRATION_ERROR: "Возникла ошибка регистрации!",
} as const;

export type AuthFormUIMessagesKey = keyof typeof AuthFormUIMessages;
