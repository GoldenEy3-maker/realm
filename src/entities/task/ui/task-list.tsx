import { Link } from "@tanstack/react-router";

import { Button } from "@/shared/ui/button";

import { useTasksSuspenseQuery } from "../api/use-tasks-suspense-query";

export function TaskList() {
  const { data } = useTasksSuspenseQuery();

  return (
    <div>
      {data.map((task) => (
        <Button asChild variant="link" key={task.id}>
          <Link to="/tasks/$taskSlug" params={{ taskSlug: task.slug }}>
            {task.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
