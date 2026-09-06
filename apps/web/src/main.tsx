import { RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import { createApp } from "./app/create-app";

function bootstrap() {
  const app = createApp();
  const rootElement = document.getElementById("app")!;

  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<RouterProvider router={app} />);
  }
}

bootstrap();
