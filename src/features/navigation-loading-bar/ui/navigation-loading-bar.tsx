import { useLocation, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

export function NavigationLoadingBar() {
  const loadingRef = useRef<LoadingBarRef>(null);
  const location = useLocation();
  const status = useRouterState({ select: (state) => state.status });
  const visitedRoutes = useRef<Set<string>>(new Set());

  useEffect(() => {
    const currentPath = location.pathname;
    const isVisited = visitedRoutes.current.has(currentPath);

    if (status === "pending" && !isVisited) {
      loadingRef.current?.continuousStart();
    } else if (loadingRef.current?.getProgress() !== 0) {
      loadingRef.current?.complete();
    }

    if (!isVisited) visitedRoutes.current.add(currentPath);
  }, [location.pathname, status]);

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
