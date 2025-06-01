import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import eslintPlugin from "@nabla/vite-plugin-eslint";

export default defineConfig({
  tsr: {
    appDirectory: "src/app",
    routesDirectory: "src/app/routes",
    generatedRouteTree: "src/app/route-tree.gen.ts",
  },
  vite: {
    plugins: [
      eslintPlugin(),
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
