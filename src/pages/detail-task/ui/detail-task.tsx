import { Link } from "@tanstack/react-router";

import { useTaskBySlugSuspenseQuery } from "@/entities/task";
import { type Slug } from "@/shared/types/slug";

interface DetailTaskProps {
  slug: Slug;
}

export const DetailTask = ({ slug }: DetailTaskProps) => {
  const { data } = useTaskBySlugSuspenseQuery({ slug });

  return (
    <div className="subgrid-container">
      <Link
        className="col-span-full"
        to="/tasks/$taskSlug/test/$testId"
        params={{ taskSlug: slug, testId: "1" }}
      >
        Тестовый урл
      </Link>
      <div className="col-span-full">
        <h3 className="text-2xl font-bold">{data.title}</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};
