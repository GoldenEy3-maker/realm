import { createFileRoute } from "@tanstack/react-router";

import {
  getTaskBySerialNumberQueryOptions,
  useTaskBySerialNumberSuspenseQuery,
} from "@/entities/task/api";
import { DetailTaskPage } from "@/pages/detail-task/ui";
import { createRouteLoaderMeta } from "@/shared/lib/route-loader-meta/create-route-loader-meta";

export const Route = createFileRoute("/_root/tasks/$serialNumber/")({
  component: RouteComponent,
  loader: async ({ params, context }) => {
    const queryOptions = getTaskBySerialNumberQueryOptions({
      serialNumber: Number(params.serialNumber),
    });

    const task = await context.queryClient.ensureQueryData(queryOptions);

    return { ...createRouteLoaderMeta({ headerTitle: task?.title ?? "Задача не найдена" }) };
  },
});

function RouteComponent() {
  const { serialNumber } = Route.useParams();
  const { data: task } = useTaskBySerialNumberSuspenseQuery({ serialNumber: Number(serialNumber) });

  if (!task)
    return (
      <div className="main-subgrid-container">
        <div className="col-span-full">Task not found</div>
      </div>
    );

  return <DetailTaskPage task={task} />;
}
