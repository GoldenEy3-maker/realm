import { useSuspenseQuery } from "@tanstack/react-query";
import { getTasksQueryOptions } from "../api/tasks-query-options";

export function TaskList() {
  const { data } = useSuspenseQuery(getTasksQueryOptions());

  return (
    <div>
      <h3 className="text-2xl font-bold">Tasks</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
