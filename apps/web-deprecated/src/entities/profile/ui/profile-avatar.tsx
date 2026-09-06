import type { UserStatus } from "@/entities/user/model";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

import { getProfileAvatarAltImage, getProfileAvatarFallback } from "../lib";

interface ProfileAvatarProps extends React.ComponentProps<typeof Avatar> {
  src?: string;
  lastName?: string;
  firstName?: string;
  status?: UserStatus;
}

export function ProfileAvatar({
  src,
  firstName,
  lastName,
  status: _status,
  ...props
}: ProfileAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarImage src={src} alt={getProfileAvatarAltImage(lastName, firstName)} />
      <AvatarFallback>{getProfileAvatarFallback(lastName, firstName)}</AvatarFallback>
    </Avatar>
  );
}
