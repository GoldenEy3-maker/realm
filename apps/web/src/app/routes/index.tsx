import { createFileRoute } from "@tanstack/react-router";

import { HomeView } from "@/features/home/presentation/views/home-view";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <HomeView />;
}
