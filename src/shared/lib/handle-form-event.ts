import { FormEvent } from "react";

/**
 * Prevents the default form event from bubbling up and executing the callback.
 * @param callback - callback to execute
 */
export function handleFormEvent(callback: () => void) {
  return (event: FormEvent) => {
    event.stopPropagation();
    event.preventDefault();
    callback();
  };
}
