import { Navigation } from "./navigation";

export function MainSidebar() {
  return (
    <aside className="sticky top-0 left-0 h-screen border-r p-2 flex flex-col">
      <Navigation />
    </aside>
  );
}
