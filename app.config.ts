import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
// import babel from "vite-plugin-babel";

export default defineConfig({
  tsr: {
    appDirectory: "src/app",
    routesDirectory: "src/app/routes",
    generatedRouteTree: "src/app/route-tree.gen.ts",
  },
  vite: {
    plugins: [
      // babel({
      //   babelConfig: {
      //     plugins: ["babel-plugin-react-compiler", {}],
      //   },
      // }),
      tailwindcss(),
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
