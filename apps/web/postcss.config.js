import pxToRemPlugin from "postcss-pxtorem";
import wrapLayerPlugin from "@zhoumutou/postcss-wrap-layer";

/** @type {import("postcss-load-config").Config} */
export default {
  plugins: [
    pxToRemPlugin({ rootValue: 16, propList: ["*"], exclude: /node_modules/i }),
    wrapLayerPlugin({
      rules: [
        {
          pattern: /node_modules\/*\.(css|scss)/,
          layerName: "vendor",
          insertPosition: "start",
        },
        {
          pattern: /core\/.*\.(css|scss)/,
          layerName: "core",
          insertPosition: "start",
        },
        {
          pattern: /domains\/.*\/presentation\/ui\/.*\.(css|scss)/,
          layerName: "domains-ui",
          insertPosition: "start",
        },
        {
          pattern: /features\/.*\/presentation\/ui\/.*\.(css|scss)/,
          layerName: "features-ui",
          insertPosition: "start",
        },
        {
          pattern: /features\/.*\/presentation\/views\/.*\.(css|scss)/,
          layerName: "features-views",
          insertPosition: "start",
        },
      ],
    }),
  ],
};
