import eslintPlugin from "@nabla/vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    eslintPlugin(),
    tailwindcss(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      customViteReactPlugin: true,
      target: "bun",
      react: {
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      },
      tsr: {
        srcDirectory: "src/app",
        routesDirectory: "src/app/routes",
        generatedRouteTree: "src/app/route-tree.gen.ts",
      },
    }),
  ],
});
