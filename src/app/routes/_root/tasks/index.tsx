import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { getTasksQueryOptions, TasksList } from "@/entities/task";
import { createCrumbs } from "@/features/dynamic-breadcrumbs";

export const Route = createFileRoute("/_root/tasks/")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(getTasksQueryOptions());

    return createCrumbs([
      {
        type: "static",
        label: "Задачи",
      },
    ]);
  },
});

function RouteComponent() {
  return (
    <main className="subgrid-container">
      <div className="col-span-full">Hello &quot;/tasks&quot;!</div>
      <div className="col-span-full">
        <Suspense fallback={<div>Loading...</div>}>
          <TasksList />
        </Suspense>
      </div>
    </main>
  );
}
