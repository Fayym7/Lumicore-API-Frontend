import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,                  // LumiCore 30% failure rate
      retryDelay: attempt =>
        Math.min(1000 * 2 ** attempt, 5000),
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 2,
    },
  },
})
