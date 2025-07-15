import { createContext, type ReactNode, useContext, useRef } from "react";
import { type StoreApi, useStore } from "zustand";

export interface StoreProviderProps<T> {
  children: ReactNode;
  initState?: T;
}

export function createStoreProvider<T, A>(
  createStore: (initState?: T) => StoreApi<T & A>,
) {
  type StoreApi = ReturnType<typeof createStore>;

  const StoreContext = createContext<StoreApi | null>(null);

  function StoreProvider({ children, initState }: StoreProviderProps<T>) {
    const storeRef = useRef<StoreApi | null>(null);

    if (!storeRef.current) {
      storeRef.current = createStore(initState);
    }

    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useStoreContext<U>(selector: (state: T & A) => U): U {
    const store = useContext(StoreContext);

    if (!store) {
      throw new Error(`useStoreContext must be used within StoreProvider`);
    }

    return useStore(store, selector);
  }

  return {
    StoreProvider,
    useStoreContext,
  };
}
