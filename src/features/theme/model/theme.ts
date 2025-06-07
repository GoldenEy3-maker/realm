import { ValueOf } from "@/shared/types/value-of";

import { ThemesMap } from "../constants/themes-map";

export type Theme = ValueOf<typeof ThemesMap>;
