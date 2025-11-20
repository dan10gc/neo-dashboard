import type { Preview } from "@storybook/react-vite";
import { PostHogProvider } from "posthog-js/react";
import { BrowserRouter } from "react-router";
import "../src/index.css";
import type { PostHog } from "posthog-js";

// Ensure localStorage is available in Storybook
if (typeof globalThis !== 'undefined' && typeof globalThis.localStorage === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}

// Mock PostHog client for Storybook
const mockPostHogClient = {
  capture: () => {},
  identify: () => {},
  reset: () => {},
  isFeatureEnabled: () => false,
  getFeatureFlag: () => undefined,
  onFeatureFlags: () => {},
  reloadFeatureFlags: () => {},
  setPersonProperties: () => {},
} as unknown as PostHog;

const preview: Preview = {
  decorators: [
    (Story) => (
      <PostHogProvider client={mockPostHogClient}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </PostHogProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        {
          name: "dark",
          value: "#18181b",
        },
        {
          name: "light",
          value: "#ffffff",
        },
      ],
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
