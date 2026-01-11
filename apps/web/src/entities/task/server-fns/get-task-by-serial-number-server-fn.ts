import { createServerFn } from "@tanstack/react-start";

import { schemaValidation } from "@/shared/lib/schema-validation";
import { createServerApiClientInstance } from "@/shared/services/api/create-server-api-client-instance";

import { TaskApi } from "../api/task-api";

export const getTaskBySerialNumberServerFn = createServerFn({
  method: "GET",
})
  .inputValidator(schemaValidation.object({ serialNumber: schemaValidation.number() }))
  .handler(({ data }) => {
    const taskApi = createServerApiClientInstance(TaskApi);

    return taskApi.getTaskBySerialNumber({
      params: {
        path: {
          serialNumber: data.serialNumber,
        },
      },
    });
  });
