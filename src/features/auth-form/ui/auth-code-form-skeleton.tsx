import { Skeleton } from "@/shared/ui/skeleton";

import { AUTH_CODE_LENGTH } from "../constants/auth-code-length";

export function AuthCodeFormSkeleton() {
  return (
    <div>
      <Skeleton className="h-3.5 w-40" />
      <div className="mt-2 flex items-center gap-2">
        {Array.from({ length: AUTH_CODE_LENGTH }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full flex-1" />
        ))}
      </div>
      <Skeleton className="mt-4 h-9 w-full" />
    </div>
  );
}
