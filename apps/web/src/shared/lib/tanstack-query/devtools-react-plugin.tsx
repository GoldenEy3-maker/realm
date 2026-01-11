import type { TanStackDevtoolsReactPlugin } from "@tanstack/react-devtools";
import { type DevtoolsPanelOptions, ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

export const TanStackQueryDevtoolsReactPlugin = (
  props: DevtoolsPanelOptions = {},
): TanStackDevtoolsReactPlugin => {
  return {
    name: "Tanstack Query",
    render: <ReactQueryDevtoolsPanel {...props} />,
  };
};
