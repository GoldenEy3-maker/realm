export type QueryOptionsWithoutFnAndKey<T> = Omit<T, "queryFn" | "queryKey">;
