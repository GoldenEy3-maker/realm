import { createFileRoute } from "@tanstack/react-router";

import { getTaskBySlugQueryOptions } from "@/entities/task";
import { setCrumbs } from "@/features/auto-breadcrumbs";

export const Route = createFileRoute("/_root/tasks/$taskSlug/test/$testId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const task = await context.queryClient.ensureQueryData(
      getTaskBySlugQueryOptions(params.taskSlug),
    );

    return {
      ...setCrumbs([
        { label: "Задачи", href: "/tasks" },
        {
          label: task.title,
          href: "/tasks/$taskSlug",
          params: { taskSlug: params.taskSlug },
        },
        {
          label: "Тестовый урл",
        },
      ]),
    };
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
