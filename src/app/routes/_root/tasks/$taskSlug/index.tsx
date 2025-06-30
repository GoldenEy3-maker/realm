import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { getTaskBySlugQueryOptions } from "@/entities/task";
import { createCrumbs } from "@/features/dynamic-breadcrumbs";
import { DetailTask } from "@/pages/detail-task";

export const Route = createFileRoute("/_root/tasks/$taskSlug/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
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
        queryOptions,
      },
    ]);
  },
});

function RouteComponent() {
  const { taskSlug } = Route.useParams();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DetailTask slug={taskSlug} />
    </Suspense>
  );
}
