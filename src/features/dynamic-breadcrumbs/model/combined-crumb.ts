import { type QueryKey } from "@tanstack/react-query";

import { type StaticCrumb } from "./static-crumb";
import { type SuspenceCrumb } from "./suspence-crumb";

export type CombinedCrumb<T = unknown, TQueryKey extends QueryKey = QueryKey> =
  | ({
      type: "static";
    } & StaticCrumb)
  | ({
      type: "suspense";
    } & SuspenceCrumb<T, TQueryKey>);
