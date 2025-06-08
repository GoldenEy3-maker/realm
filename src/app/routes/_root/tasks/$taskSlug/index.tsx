import { createFileRoute, Link } from "@tanstack/react-router";

import { DetailTask, getTaskBySlugQueryOptions } from "@/entities/task";
import { setCrumbs } from "@/features/auto-breadcrumbs";

export const Route = createFileRoute("/_root/tasks/$taskSlug/")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const task = await context.queryClient.ensureQueryData(
      getTaskBySlugQueryOptions(params.taskSlug),
    );

    return {
      ...setCrumbs([
        { label: "Задачи", href: "/tasks" },
        { label: task.title },
      ]),
    };
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
      <DetailTask slug={taskSlug} className="col-span-full" />
    </div>
  );
}
