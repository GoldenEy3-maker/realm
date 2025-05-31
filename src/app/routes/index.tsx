import { ThemeToggle } from "@/features/theme";
import { Button } from "@/shared/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3>Welcome Home!!!</h3>
      <Button asChild>
        <Link to="/tasks">Tasks</Link>
      </Button>
      <ThemeToggle />
    </div>
  );
}
