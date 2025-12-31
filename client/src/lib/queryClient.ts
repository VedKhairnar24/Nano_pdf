import { QueryClient } from "@tanstack/react-query";

/**
 * QueryClient for React Query
 * Used for managing client-side state and mutations
 * No server/API calls needed - all processing is client-side
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
