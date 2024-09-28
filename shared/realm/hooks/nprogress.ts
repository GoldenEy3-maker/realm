import { useFetchers, useNavigation } from "@remix-run/react";
import NProgress from "nprogress";
import { useEffect, useMemo } from "react";

export function useNProgress(opts: Partial<NProgress.NProgressOptions>) {
  const transition = useNavigation();
  const fetchers = useFetchers();

  const state = useMemo<"idle" | "loading">(() => {
    let states = [
      transition.state,
      ...fetchers.map((fetcher) => fetcher.state),
    ];
    if (states.every((state) => state === "idle")) return "idle";
    return "loading";
  }, [transition.state, fetchers]);

  useEffect(() => {
    NProgress.configure(opts);
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [transition.state]);
}
