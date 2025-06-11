import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { DetailTask, getTaskBySlugQueryOptions } from "@/entities/task";
import { createCrumbs } from "@/features/dynamic-breadcrumbs";

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
    <div className="subgrid-container">
      <Link
        className="col-span-full"
        to="/tasks/$taskSlug/test/$testId"
        params={{ taskSlug, testId: "1" }}
      >
        Тестовый урл
      </Link>
      <Suspense fallback={<p>Loading...</p>}>
        <DetailTask slug={taskSlug} className="col-span-full" />
      </Suspense>
    </div>
  );
}
