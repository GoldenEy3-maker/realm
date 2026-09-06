import type { TaskDTO } from "@/entities/task/model";

interface DetailTaskPageProps {
  task: TaskDTO;
}

export function DetailTaskPage({ task }: DetailTaskPageProps) {
  return (
    <div className="main-subgrid-container">
      <div className="col-span-full">
        <h3 className="text-2xl font-bold">{task.title}</h3>
        <pre>{JSON.stringify(task, null, 2)}</pre>
      </div>
    </div>
  );
}
