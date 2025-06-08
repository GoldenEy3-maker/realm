import { useSuspenseQuery } from "@tanstack/react-query";

import { cn } from "@/shared/lib/cn";

import { getTaskBySlugQueryOptions } from "../api/get-task-by-slug-query-options";

interface DetailTaskProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  slug: string;
}

export const DetailTask = ({ slug, className, ...props }: DetailTaskProps) => {
  const { data } = useSuspenseQuery(getTaskBySlugQueryOptions(slug));

  return (
    <div className={cn(className)} {...props}>
      <h3 className="text-2xl font-bold">{data.title}</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
