import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { getTasksQueryOptions, TaskList } from "@/entities/task";

export const Route = createFileRoute("/_root/tasks")({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(getTasksQueryOptions());
  },
});

function RouteComponent() {
  return (
    <div>
      <div>Hello &quot;/tasks&quot;!</div>
      <Suspense fallback={<div>Loading...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
}
