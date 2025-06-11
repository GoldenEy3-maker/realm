import { createFileRoute } from "@tanstack/react-router";

import { getTaskBySlugQueryOptions } from "@/entities/task";
import { createCrumbs } from "@/features/dynamic-breadcrumbs";

export const Route = createFileRoute("/_root/tasks/$taskSlug/test/$testId")({
  component: RouteComponent,
  loader: ({ context, params }) => {
    const queryOptions = getTaskBySlugQueryOptions(params.taskSlug);

    context.queryClient.prefetchQuery(queryOptions);

    return createCrumbs([
      {
        type: "static",
        label: "Задачи",
        href: "/tasks",
      },
      {
        type: "suspense",
        label: "title",
        href: "/tasks/$taskSlug",
        params: { taskSlug: "slug" },
        queryOptions,
      },
      {
        type: "static",
        label: "Тестовый урл",
      },
    ]);
  },
});

function RouteComponent() {
  return (
    <div className="subgrid-container">
      <h3 className="col-span-full">
        Hello "/_root/tasks/$taskSlug/test/$testId"!
      </h3>
    </div>
  );
}
