import path from "node:path";

import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        alias: {
          "@": path.resolve(import.meta.dirname, "../src"),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: [path.resolve(import.meta.dirname, "../src/app/styles")],
          },
        },
      },
    }),
};

export default config;
