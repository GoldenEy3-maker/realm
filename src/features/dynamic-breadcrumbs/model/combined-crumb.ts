import { QueryKey } from "@tanstack/react-query";

import { StaticCrumb } from "./static-crumb";
import { SuspenceCrumb } from "./suspence-crumb";

export type CombinedCrumb<T = unknown, TQueryKey extends QueryKey = QueryKey> =
  | ({
      type: "static";
    } & StaticCrumb)
  | ({
      type: "suspense";
    } & SuspenceCrumb<T, TQueryKey>);
