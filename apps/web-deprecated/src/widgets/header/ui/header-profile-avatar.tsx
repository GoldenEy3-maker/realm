import { useGetProfileSuspenseQuery } from "@/entities/profile/api";
import { ProfileAvatar } from "@/entities/profile/ui";
import { useGetSessionSuspenseQuery } from "@/shared/services/auth/api";

export function HeaderProfileAvatar() {
  const { data: session } = useGetSessionSuspenseQuery();
  const { data: profile } = useGetProfileSuspenseQuery();

  return (
    <ProfileAvatar
      src={profile?.avatarUrl ?? undefined}
      firstName={profile?.firstName}
      lastName={profile?.lastName}
      status={session?.status}
      className="size-11"
    />
  );
}
