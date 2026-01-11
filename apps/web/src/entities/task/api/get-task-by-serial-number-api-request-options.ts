import type { ApiRequestOptions } from "@/shared/services/api/api-request-options";

export type GetTaskBySerialNumberApiRequestOptions = ApiRequestOptions<
  "/v1/tasks/{serialNumber}",
  "get"
>;

