import { z } from "zod";
import { insertConversionSchema, conversions } from "./schema";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  unlock: {
    process: {
      method: "POST" as const,
      path: "/api/unlock",
      // Input is FormData (file + password), not strictly typed here
      responses: {
        200: z.object({
          message: z.string(),
          filename: z.string(),
          downloadUrl: z.string()
        }),
        400: errorSchemas.validation,
        500: errorSchemas.internal
      }
    },
    download: {
      method: "GET" as const,
      path: "/api/download/:filename",
      responses: {} // Binary response
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
