import eslintPlugin from "@nabla/vite-plugin-eslint";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    eslintPlugin(),
    tailwindcss(),
    tanstackStart({
      srcDirectory: "./src/app",
      router: {
        entry: "./router.tsx",
        routesDirectory: "./routes",
        generatedRouteTree: "./route-tree.gen.ts",
      },
    }),
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
});
