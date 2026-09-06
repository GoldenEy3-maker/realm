import { noop } from "./noop";

export const composeEventHandlers = <E extends { defaultPrevented: boolean }>(
  originalEventHandler: (event: E) => void = noop,
  ourEventHandler: (event: E) => void = noop,
  { checkForDefaultPrevented = true } = {},
) => {
  return (event: E) => {
    originalEventHandler(event);

    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler(event);
    }
  };
};
