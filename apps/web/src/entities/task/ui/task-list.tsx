import { Link } from "@tanstack/react-router";

import { Button } from "@/shared/ui/button";

import { useTasksSuspenseQuery } from "../api";

export function TaskList() {
  const { data } = useTasksSuspenseQuery();

  return (
    <div>
      {data.map((task) => (
        <Button asChild variant="link" key={task.id}>
          <Link to="/tasks/$serialNumber" params={{ serialNumber: task.serialNumber.toString() }}>
            {task.title}
          </Link>
        </Button>
      ))}
    </div>
  );
}
