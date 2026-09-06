import type { ApiClient } from "@/shared/services/api/api-client";

import type { TaskResponseDTO } from "../model";
import type { GetTaskBySerialNumberApiRequestOptions } from "./get-task-by-serial-number-api-request-options";

export class TaskApi {
  constructor(private readonly api: ApiClient) {}

  async getTasks(): Promise<TaskResponseDTO[]> {
    const response = await this.api.GET("/v1/tasks");

    return response.data?.data ?? [];
  }

  async getTaskBySerialNumber(
    requestOptions: GetTaskBySerialNumberApiRequestOptions,
  ): Promise<TaskResponseDTO | null> {
    const response = await this.api.GET(`/v1/tasks/{serialNumber}`, requestOptions);

    return response.data?.data ?? null;
  }
}
