import { Link } from "@tanstack/react-router";

import { ThemeToggle } from "@/features/theme";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";

interface SidebarProps
  extends Omit<React.ComponentProps<"aside">, "children"> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <aside
      className={cn("subgrid-container col-[sidebar] p-5", className)}
      {...props}
    >
      <nav>
        <Button variant="outline" asChild>
          <Link to="/tasks">Tasks</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/auth">Авторизация</Link>
        </Button>
        <ThemeToggle />
      </nav>
    </aside>
  );
}
