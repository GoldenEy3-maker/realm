export const AuthFormUIMessages = {
  EMAIL_CODE_SENT: (email: string) =>
    `Код для авторизации отправлен на ${email}`,
  EMAIL_CODE_SEND_ERROR: "Не удалось отправить код. Повторите попытку позже.",
  REGISTRATION_ERROR: "Возникла ошибка регистрации!",
} as const;

export type AuthFormUIMessagesKey = keyof typeof AuthFormUIMessages;
