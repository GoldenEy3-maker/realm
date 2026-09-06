export function getProfileAvatarFallback(lastName?: string, firstName?: string) {
  if (lastName && firstName) {
    return `${lastName.at(0)}${firstName.at(0)}`;
  }

  return firstName?.at(0) ?? lastName?.at(0) ?? "П";
}
