import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorBoundary } from "./error-boundary";

const meta = {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: false,
    },
    fallback: {
      control: false,
    },
  },
} satisfies Meta<typeof ErrorBoundary>;

export default meta;
type Story = StoryObj<typeof meta>;

// Component that throws an error
const ThrowError = ({
  message = "Test error message",
}: {
  message?: string;
}) => {
  throw new Error(message);
};

// Component that works normally
const WorkingComponent = () => (
  <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex items-center justify-center font-mono">
    <div className="bg-zinc-800/50 border-2 border-green-700/50 p-8 rounded-sm">
      <h2 className="text-xl font-bold text-green-400 uppercase tracking-wider mb-4">
        System Operational
      </h2>
      <p className="text-zinc-300">
        No errors detected. The error boundary is working correctly.
      </p>
    </div>
  </div>
);

/**
 * Default error boundary state showing a critical system error.
 * Displays military-styled error message with technical diagnostics.
 */
export const Default: Story = {
  args: {
    children: <ThrowError message="Failed to fetch asteroid data from NASA API" />,
  },
};

/**
 * Error boundary with a network error message.
 * Simulates connection failure scenario.
 */
export const NetworkError: Story = {
  args: {
    children: <ThrowError message="Network request failed: ERR_CONNECTION_REFUSED" />,
  },
};

/**
 * Error boundary with a parsing error.
 * Simulates data corruption or invalid JSON response.
 */
export const ParseError: Story = {
  args: {
    children: <ThrowError message="JSON.parse: unexpected character at line 1 column 1 of the JSON data" />,
  },
};

/**
 * Error boundary with a timeout error.
 * Simulates API request timeout scenario.
 */
export const TimeoutError: Story = {
  args: {
    children: <ThrowError message="Request timeout: Server did not respond within 30 seconds" />,
  },
};

// Component that throws an error with a long stack trace
const ErrorWithStack = () => {
  const error = new Error("Runtime error in data processing module");
  error.stack = `Error: Runtime error in data processing module
    at processAsteroidData (asteroid-processor.ts:145:12)
    at transformNeoData (data-transformer.ts:89:5)
    at Dashboard (dashboard.tsx:67:23)
    at renderWithHooks (react-dom.development.js:14985:18)
    at updateFunctionComponent (react-dom.development.js:17356:20)
    at beginWork (react-dom.development.js:19063:16)
    at HTMLUnknownElement.callCallback (react-dom.development.js:3945:14)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:3994:16)`;
  throw error;
};

/**
 * Error boundary with a long stack trace.
 * Shows how the component handles verbose error details.
 */
export const LongStackTrace: Story = {
  args: {
    children: <ErrorWithStack />,
  },
};

/**
 * Error boundary with no error (working state).
 * Shows that the boundary doesn't interfere with normal operation.
 */
export const NoError: Story = {
  args: {
    children: <WorkingComponent />,
  },
};

/**
 * Error boundary with custom fallback UI.
 * Demonstrates the fallback prop functionality.
 */
export const CustomFallback: Story = {
  args: {
    children: <ThrowError message="Custom fallback test" />,
    fallback: (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex items-center justify-center font-mono">
        <div className="bg-zinc-800/50 border-2 border-yellow-700/50 p-8 rounded-sm max-w-lg">
          <h2 className="text-xl font-bold text-yellow-400 uppercase tracking-wider mb-4">
            Custom Error Handler
          </h2>
          <p className="text-zinc-300 text-sm">
            This is a custom fallback UI provided via the fallback prop.
          </p>
        </div>
      </div>
    ),
  },
};
