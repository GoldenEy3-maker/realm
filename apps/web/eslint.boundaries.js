import boundaries from "eslint-plugin-boundaries";

export const eslintBoundariesConfig = {
  plugins: {
    boundaries,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    "boundaries/elements": [
      {
        type: "app",
        pattern: "./src/app",
      },
      {
        type: "pages",
        pattern: "./src/pages/*",
      },
      {
        type: "widgets",
        pattern: "./src/widgets/*",
      },
      {
        type: "features",
        pattern: "./src/features/*",
      },
      {
        type: "entities",
        pattern: "./src/entities/*",
      },
      {
        type: "shared",
        pattern: "./src/shared",
      },
    ],
  },
  rules: {
    "boundaries/element-types": [
      2,
      {
        default: "allow",
        rules: [
          {
            from: "shared",
            disallow: ["app", "pages", "features", "widgets", "entities"],
            message:
              "Lower layer module (${file.type}) cannot import from upper layer module (${dependency.type})",
          },
          {
            from: "entities",
            disallow: ["app", "pages", "features", "widgets"],
            message:
              "Lower layer module (${file.type}) cannot import from upper layer module (${dependency.type})",
          },
          {
            from: "features",
            disallow: ["app", "pages", "widgets"],
            message:
              "Lower layer module (${file.type}) cannot import from upper layer module (${dependency.type})",
          },
          {
            from: "widgets",
            disallow: ["app", "pages"],
            message:
              "Lower layer module (${file.type}) cannot import from upper layer module (${dependency.type})",
          },
          {
            from: "widgets",
            disallow: ["widgets"],
            message:
              "Cross-module dependencies are not allowed in the widgets layer",
          },
          {
            from: "features",
            disallow: ["features"],
            message:
              "Cross-module dependencies are not allowed in the features layer",
          },
          {
            from: "pages",
            disallow: ["pages"],
            message:
              "Cross-module dependencies are not allowed in the pages layer",
          },
        ],
      },
    ],
    "boundaries/entry-point": [
      2,
      {
        default: "disallow",
        message:
          "Module (${file.type}) must be imported through segments of public API. Direct import from ${dependency.source} is not allowed",

        rules: [
          {
            target: ["shared", "app"],
            allow: "**",
          },
          {
            target: ["features", "widgets", "entities", "pages"],
            allow: [
              "ui/index.(ts|tsx)",
              "server-fns/index.(ts|tsx)",
              "api/index.(ts|tsx)",
              "model/index.(ts|tsx)",
              "lib/index.(ts|tsx)",
            ],
          },
        ],
      },
    ],
  },
};
