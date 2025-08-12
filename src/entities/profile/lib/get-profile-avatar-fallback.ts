import type { ProfileDomain } from "../model/profile-domain";

export function getProfileAvatarFallback(profile: ProfileDomain | null) {
  return profile?.firstName.at(0) ?? "П";
}
