import { useMutation } from "@tanstack/react-query";
import { api, type errorSchemas } from "@shared/routes";
import { z } from "zod";

// Define the success response type locally since it's an object in the route definition
type UnlockResponse = {
  message: string;
  filename: string;
  downloadUrl: string;
};

// Define error type
type ApiError = {
  message: string;
};

export function useUnlockPdf() {
  return useMutation<UnlockResponse, Error, FormData>({
    mutationFn: async (formData) => {
      const res = await fetch(api.unlock.process.path, {
        method: api.unlock.process.method,
        body: formData, // Browser automatically sets Content-Type to multipart/form-data
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        
        // Handle specific error codes
        if (res.status === 400 || res.status === 500) {
          throw new Error(errorData.message || "Failed to process PDF");
        }
        
        throw new Error(`Error: ${res.statusText}`);
      }

      // Parse success response using Zod schema from routes
      const data = await res.json();
      return api.unlock.process.responses[200].parse(data);
    },
  });
}
