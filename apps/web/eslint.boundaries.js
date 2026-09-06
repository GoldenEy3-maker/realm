import boundaries from "eslint-plugin-boundaries";

const sliceTypes = ["domains", "features"];
const slicePublicApiPath =
  "{data/data-sources,data/models/data/repositories,domain/entities,domain/usecases,domain/repositories,presentation/store,presentation/views/**,presentation/ui/**,presentation/container,di}/index.@(ts|tsx)";

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
        type: "core",
        pattern: "./src/core/*",
      },
      {
        type: "domains",
        pattern: "./src/domains/*",
      },
      {
        type: "features",
        pattern: "./src/features/*",
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
            from: { element: { type: "core" } },
            disallow: {
              to: { element: { type: ["app", "domains", "features"] } },
            },
            message:
              "Lower layer ({{ from.element.type }}) cannot import from upper layer ({{ to.element.type }})",
          },
          {
            from: { element: { type: "domains" } },
            disallow: {
              to: { element: { type: ["app", "features"] } },
            },
            message:
              "Lower layer ({{ from.element.type }}) cannot import from upper layer ({{ to.element.type }})",
          },
          {
            from: { element: { type: "features" } },
            disallow: {
              to: { element: { type: ["app"] } },
            },
            message:
              "Lower layer ({{ from.element.type }}) cannot import from upper layer ({{ to.element.type }})",
          },
          {
            from: { element: { type: "features" } },
            disallow: {
              to: { element: { type: "features" } },
            },
            message: "Cross-module dependencies are not allowed in the widgets layer",
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
