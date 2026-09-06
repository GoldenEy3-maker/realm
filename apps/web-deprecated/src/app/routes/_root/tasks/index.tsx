import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { getTasksQueryOptions } from "@/entities/task/api";
import { TaskList } from "@/entities/task/ui";
import { createRouteLoaderMeta } from "@/shared/lib/route-loader-meta/create-route-loader-meta";

export const Route = createFileRoute("/_root/tasks/")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(getTasksQueryOptions());

    return { ...createRouteLoaderMeta({ headerTitle: "Задачи" }) };
  },
});

function RouteComponent() {
  return (
    <main className="main-subgrid-container">
      <div className="col-span-full">Hello &quot;/tasks&quot;!</div>
      <div className="col-span-full">
        <Suspense fallback={<div>Loading...</div>}>
          <TaskList />
        </Suspense>
      </div>
    </main>
  );
}
