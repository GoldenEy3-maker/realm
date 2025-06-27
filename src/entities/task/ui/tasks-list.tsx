import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import { Button } from "@/shared/ui/button";

import { getTasksQueryOptions } from "../api/get-tasks-query-options";
import { TaskDomain } from "../model/task-domain";

export function TasksList() {
  const { data } = useSuspenseQuery(getTasksQueryOptions());

  return (
    <div>
      {data.map((task: TaskDomain) => (
        <Button asChild variant="link" key={task.id}>
          <Link to="/tasks/$taskSlug" params={{ taskSlug: task.slug }}>
            {task.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
