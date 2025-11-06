// This file MUST be imported first before any other modules
// It sets up Sentry instrumentation for the entire application
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Try to load .env file if it exists (development), ignore if not found (production)
try {
  process.loadEnvFile(".env");
} catch {
  // No .env file - using platform environment variables
}

const SENTRY_DSN = process.env.SENTRY_DSN || "";
const SENTRY_ENVIRONMENT =
  process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV || "development";
const SENTRY_TRACES_SAMPLE_RATE = process.env.SENTRY_TRACES_SAMPLE_RATE
  ? parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE)
  : 1.0;
const SENTRY_PROFILES_SAMPLE_RATE = process.env.SENTRY_PROFILES_SAMPLE_RATE
  ? parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE)
  : 1.0;

if (!SENTRY_DSN) {
  console.warn("⚠️  Sentry DSN not found. Error tracking will be disabled.");
} else {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,

    // Performance Monitoring
    tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,

    // Profiling
    profilesSampleRate: SENTRY_PROFILES_SAMPLE_RATE,

    integrations: [
      // Profiling integration
      nodeProfilingIntegration(),

      // HTTP integration for tracking outgoing requests
      Sentry.httpIntegration(),

      // Express integration
      Sentry.expressIntegration(),
    ],

    // Capture unhandled promise rejections
    beforeSend(event) {
      // Add custom logic here if needed (e.g., filter sensitive data)
      return event;
    },
  });

  console.log("✅ Sentry initialized successfully");
}
