import type { RouteLoaderMeta } from "./route-loader-meta";

export function createRouteLoaderMeta(metaData: RouteLoaderMeta): {
  meta: RouteLoaderMeta;
} {
  return {
    meta: metaData,
  };
}
