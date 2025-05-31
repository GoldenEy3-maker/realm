import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export function NavigationLoadingBar() {
  const loadingRef = useRef<LoadingBarRef>(null);
  const status = useRouterState({ select: (state) => state.status });

  useEffect(() => {
    if (status === "pending") {
      loadingRef.current?.continuousStart();
    } else if (loadingRef.current?.getProgress() !== 0) {
      loadingRef.current?.complete();
    }
  }, [status]);

  return (
    <LoadingBar
      className="!bg-primary"
      shadow={false}
      waitingTime={300}
      ref={loadingRef}
      height={5}
    />
  );
}
