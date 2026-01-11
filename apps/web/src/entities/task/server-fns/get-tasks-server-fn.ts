import { createServerFn } from "@tanstack/react-start";

import { schemaValidation } from "@/shared/lib/schema-validation";
import { createServerApiClientInstance } from "@/shared/services/api/create-server-api-client-instance";

import { TaskApi } from "../api/task-api";

export const getTasksServerFn = createServerFn({ method: "GET" })
  .inputValidator(
    schemaValidation.object({
      limit: schemaValidation.number().min(1).max(100).optional(),
    }),
  )
  .handler(() => {
    const apiClient = createServerApiClientInstance(TaskApi);
    return apiClient.getTasks();
  });
