import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import "./index.css";
import App from "./App.tsx";
import { ErrorBoundary } from "./components/error-boundary.tsx";
import { getEnvVar } from "./lib/utils.ts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

posthog.init(getEnvVar("VITE_PUBLIC_POSTHOG_KEY"), {
  loaded: (posthog) => {
    // Conditionally disable analytics in development mode
    // https://posthog.com/tutorials/multiple-environments#opt-out-of-capturing-on-initialization
    if (import.meta.env.DEV) {
      posthog.opt_out_capturing();
      posthog.set_config({ disable_session_recording: true });
    }
  },
  api_host: getEnvVar("VITE_PUBLIC_POSTHOG_HOST"),
  defaults: "2025-05-24",
});

async function enableMocking() {
  if (!import.meta.env.DEV || !import.meta.env.VITE_ENABLE_MSW) {
    return;
  }

  const { worker } = await import("./test/mocks/browser");

  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <PostHogProvider client={posthog}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ErrorBoundary>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PostHogProvider>
    </StrictMode>
  );
});
