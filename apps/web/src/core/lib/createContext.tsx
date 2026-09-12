import { createContext as createReactContext, useContext as useReactContext, useMemo } from "react";

export function createContext<T extends object | null>(
  rootComponentName: string,
  defaultContext?: T,
) {
  const Context = createReactContext<T | undefined>(defaultContext);

  function Provider({ children, ...context }: React.PropsWithChildren<T>) {
    // Only re-memoize when prop values change
    // Values-as-deps: intentional; hooks lint requires a literal array for static analysis.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dependency list mirrors Object.values(context)
    const value = useMemo(() => context, Object.values(context)) as T;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  }

  Provider.displayName = rootComponentName + "Provider";

  function useContext(consumerName: string) {
    const context = useReactContext(Context);

    if (context) {
      return context;
    }

    if (defaultContext !== undefined) {
      return defaultContext;
    }

    // if a defaultContext wasn't specified, it's a required context.
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }

  return [Provider, useContext] as const;
}
