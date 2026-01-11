export function getProfileAvatarAltImage(lastName?: string, firstName?: string) {
  if (lastName && firstName) {
    return `Автар пользователя - ${firstName} ${lastName}`;
  }

  if (lastName) {
    return `Автар пользователя - ${lastName}`;
  }

  if (firstName) {
    return `Автар пользователя - ${firstName}`;
  }

  return "Аватар пользователя";
}
