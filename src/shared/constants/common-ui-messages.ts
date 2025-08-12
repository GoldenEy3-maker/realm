export const CommonUIMessages = {
  UNKNOWN_ERROR: "Неизвестная ошибка!",
  INVALID_EMAIL: "Неверный email!",
  INVALID_CODE: "Неверный код!",
} as const;

export type CommonUIMessagesKey = keyof typeof CommonUIMessages;
