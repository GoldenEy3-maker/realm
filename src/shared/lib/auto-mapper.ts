import { type schemaValidation } from "./schema-validation";

export function createAutoMapper<
  TSource extends Record<string, unknown>,
  TTarget extends Record<string, unknown>,
>(
  sourceSchema: schemaValidation.ZodSchema<TSource>,
  targetSchema: schemaValidation.ZodSchema<TTarget>,
  transformFn?: (source: TSource) => Partial<TTarget>,
) {
  const mapper = {
    map: (source: unknown): TTarget => {
      const validatedSource = sourceSchema.parse(source);

      const transformed = transformFn ? transformFn(validatedSource) : {};

      const result = { ...validatedSource, ...transformed };

      return targetSchema.parse(result);
    },
    mapArray: (sources: unknown[]): TTarget[] => {
      return sources.map((source) => mapper.map(source));
    },
  };

  return mapper;
}
