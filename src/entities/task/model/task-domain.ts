import * as z from "zod/v4";

import { Slug } from "@/shared/types/slug";

export const TaskDomainSchema = z.object({
  id: z.uuid(),
  slug: z.custom<Slug>(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type TaskDomain = z.output<typeof TaskDomainSchema>;
