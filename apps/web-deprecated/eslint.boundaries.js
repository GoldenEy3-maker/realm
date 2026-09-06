import boundaries from "eslint-plugin-boundaries";

const sliceTypes = ["features", "widgets", "entities", "pages"];
const slicePublicApiPath = "{ui,server-fns,api,model,lib}/index.@(ts|tsx)";

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
    "boundaries/legacy-templates": false,
    "boundaries/legacy-warnings": false,
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
    "boundaries/dependencies": [
      2,
      {
        default: "allow",
        policies: [
          {
            from: { element: { type: "shared" } },
            disallow: {
              to: { element: { type: ["app", "pages", "features", "widgets", "entities"] } },
            },
            message:
              "Lower layer ({{ from.element.type }}) cannot import from upper layer ({{ to.element.type }})",
          },
          {
            from: { element: { type: "entities" } },
            disallow: {
              to: { element: { type: ["app", "pages", "features", "widgets"] } },
            },
            message:
              "Lower layer ({{ from.element.type }}) cannot import from upper layer ({{ to.element.type }})",
          },
          {
            from: { element: { type: "features" } },
            disallow: {
              to: { element: { type: ["app", "pages", "widgets"] } },
            },
            message:
              "Lower layer ({{ from.element.type }}) cannot import from upper layer ({{ to.element.type }})",
          },
          {
            from: { element: { type: "widgets" } },
            disallow: {
              to: { element: { type: ["app", "pages"] } },
            },
            message:
              "Lower layer ({{ from.element.type }}) cannot import from upper layer ({{ to.element.type }})",
          },
          {
            from: { element: { type: "widgets" } },
            disallow: {
              to: { element: { type: "widgets" } },
            },
            message: "Cross-module dependencies are not allowed in the widgets layer",
          },
          {
            from: { element: { type: "features" } },
            disallow: {
              to: { element: { type: "features" } },
            },
            message: "Cross-module dependencies are not allowed in the features layer",
          },
          {
            from: { element: { type: "pages" } },
            disallow: {
              to: { element: { type: "pages" } },
            },
            message: "Cross-module dependencies are not allowed in the pages layer",
          },
          {
            to: { element: { type: sliceTypes } },
            disallow: {
              to: {
                element: {
                  type: sliceTypes,
                  fileInternalPath: `!(${slicePublicApiPath})`,
                },
              },
            },
            message:
              "{{ to.element.type }} must be imported through a public API segment. Direct import from {{ dependency.source }} is not allowed",
          },
        ],
      },
    ],
  },
};
