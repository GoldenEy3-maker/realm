import { useSuspenseQuery } from "@tanstack/react-query";

import { cn } from "@/shared/lib/cn";
import { ComponentPropsWithoutChildren } from "@/shared/types/component-props-without-children";
import { Slug } from "@/shared/types/slug";

import { getTaskBySlugQueryOptions } from "../api/get-task-by-slug-query-options";

interface DetailTaskProps extends ComponentPropsWithoutChildren<"div"> {
  slug: Slug;
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
