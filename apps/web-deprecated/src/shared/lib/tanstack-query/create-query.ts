import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";
import {
  queryOptions as tanstackQueryOptions,
  useQuery as useTanstackQuery,
  useSuspenseQuery as useTanstackSuspenseQuery,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import type { AnyFunction } from "@/shared/types/any-function";
import type { HasRequiredFields } from "@/shared/types/has-required-fields";

import { callIfFunction } from "../call-if-function";
import type { QueryOptionsWithoutFnAndKey } from "./query-options-without-fn-and-key";

type ServerFnParamsData<T extends AnyFunction> = Parameters<T>[0]["data"];

type UseQueryWithParams<TServerFnParamsData, TQueryFnData = unknown, TError = Error> =
  HasRequiredFields<TServerFnParamsData> extends true
    ? (
        params: TServerFnParamsData,
        options?: QueryOptionsWithoutFnAndKey<UseQueryOptions<TQueryFnData, TError>>,
      ) => UseQueryResult<TQueryFnData, TError>
    : (
        params?: TServerFnParamsData,
        options?: QueryOptionsWithoutFnAndKey<UseQueryOptions<TQueryFnData, TError>>,
      ) => UseQueryResult<TQueryFnData, TError>;

type UseSuspenseQueryWithParams<TServerFnParamsData, TQueryFnData = unknown, TError = Error> =
  HasRequiredFields<TServerFnParamsData> extends true
    ? (
        params: TServerFnParamsData,
        options?: QueryOptionsWithoutFnAndKey<UseSuspenseQueryOptions<TQueryFnData, TError>>,
      ) => UseSuspenseQueryResult<TQueryFnData, TError>
    : (
        params?: TServerFnParamsData,
        options?: QueryOptionsWithoutFnAndKey<UseSuspenseQueryOptions<TQueryFnData, TError>>,
      ) => UseSuspenseQueryResult<TQueryFnData, TError>;

export function createQuery<
  TQueryKey extends QueryKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TServerFn extends (...deps: Array<any>) => Promise<any>,
  TQueryFnData = unknown,
  TError = Error,
>(
  serverFn: TServerFn,
  queryKey: ((params: ServerFnParamsData<TServerFn>) => TQueryKey) | TQueryKey,
  queryFn: (
    serverFn: TServerFn,
    options: Parameters<QueryFunction<TQueryFnData>>[0],
    params: ServerFnParamsData<TServerFn>,
  ) => Promise<TQueryFnData>,
) {
  function queryOptions(
    ...args: HasRequiredFields<ServerFnParamsData<TServerFn>> extends true
      ? [arg1: ServerFnParamsData<TServerFn>]
      : [arg1?: ServerFnParamsData<TServerFn>]
  ) {
    const params = args[0] ?? {};
    return tanstackQueryOptions<TQueryFnData, TError>({
      // @ts-expect-error - queryKey can be a function or a static value
      queryKey: callIfFunction(queryKey, params),
      queryFn: (ctx) => queryFn(serverFn, ctx, params),
    });
  }

  const useQuery: UseQueryWithParams<ServerFnParamsData<TServerFn>, TQueryFnData, TError> = (
    params: ServerFnParamsData<TServerFn> = {},
    options: QueryOptionsWithoutFnAndKey<UseQueryOptions<TQueryFnData, TError>> = {},
  ) => {
    const handledServerFn = useServerFn(serverFn);

    // @ts-expect-error - queryOptions returns a valid query options object with the correct queryKey type
    return useTanstackQuery({
      ...queryOptions(params),
      ...options,
      // @ts-expect-error - handledServerFn is a function that returns a promise as TServerFn
      queryFn: (ctx) => queryFn(handledServerFn, ctx, params),
    });
  };

  const useSuspenseQuery: UseSuspenseQueryWithParams<
    ServerFnParamsData<TServerFn>,
    TQueryFnData,
    TError
  > = (
    params: ServerFnParamsData<TServerFn> = {},
    options: QueryOptionsWithoutFnAndKey<UseSuspenseQueryOptions<TQueryFnData, TError>> = {},
  ) => {
    const handledServerFn = useServerFn(serverFn);

    // @ts-expect-error - queryOptions returns a valid query options object with the correct queryKey type
    return useTanstackSuspenseQuery({
      ...queryOptions(params),
      ...options,
      // @ts-expect-error - handledServerFn is a function that returns a promise as TServerFn
      queryFn: (ctx) => queryFn(handledServerFn, ctx, params),
    });
  };

  return [queryOptions, { useQuery, useSuspenseQuery }] as const;
}
