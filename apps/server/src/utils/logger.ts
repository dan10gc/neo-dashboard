import pino from "pino";
import * as Sentry from "@sentry/node";
import type { Request, Response, NextFunction } from "express";
import pinoPretty from "pino-pretty";

// Determine if we're in production
const isProduction = process.env.NODE_ENV === "production";

// Create Pino logger instance with pretty printing in dev (no worker threads)
const pinoLogger = pino(
  {
    level: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),
  },
  // Use pino-pretty directly in the same process (no worker threads)
  isProduction
    ? undefined
    : pinoPretty({
        colorize: true,
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        singleLine: false,
      })
);

/**
 * Structured logger with Sentry integration
 *
 * - In development: Pretty-printed colorful logs
 * - In production: JSON structured logs
 * - Errors are automatically sent to Sentry in production
 */
export const logger = {
  /**
   * Debug-level logging (verbose information for debugging)
   */
  debug: (message: string, data?: Record<string, unknown>) => {
    pinoLogger.debug(data, message);
  },

  /**
   * Info-level logging (general informational messages)
   */
  info: (message: string, data?: Record<string, unknown>) => {
    pinoLogger.info(data, message);
  },

  /**
   * Warning-level logging (potentially harmful situations)
   */
  warn: (message: string, data?: Record<string, unknown>) => {
    pinoLogger.warn(data, message);

    // Send warnings to Sentry in production
    if (isProduction) {
      Sentry.captureMessage(message, {
        level: "warning",
        extra: data,
      });
    }
  },

  /**
   * Error-level logging (error events that might still allow the app to continue)
   * Automatically sends errors to Sentry in production
   */
  error: (message: string, error?: Error | unknown, data?: Record<string, unknown>) => {
    const errorData = {
      ...data,
      ...(error instanceof Error && {
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
      }),
    };

    pinoLogger.error(errorData, message);

    // Send to Sentry in production
    if (isProduction) {
      if (error instanceof Error) {
        Sentry.captureException(error, {
          extra: data,
        });
      } else {
        Sentry.captureMessage(message, {
          level: "error",
          extra: errorData,
        });
      }
    }
  },

  /**
   * Create a child logger with additional context
   * Useful for adding request IDs or other contextual information
   */
  child: (bindings: Record<string, unknown>) => {
    return pinoLogger.child(bindings);
  },
};

/**
 * Express middleware for logging HTTP requests and responses
 * Logs request method, path, status code, and response time
 */
export function middlewareLogResponses(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

  // Log when request starts
  logger.debug("Incoming request", {
    method: req.method,
    path: req.path,
    query: req.query,
  });

  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    const logData = {
      method: req.method,
      path: req.path,
      status,
      duration: `${duration}ms`,
    };

    // Log based on status code
    if (status >= 500) {
      logger.error("Request failed", undefined, logData);
    } else if (status >= 400) {
      logger.warn("Request error", logData);
    } else {
      logger.info("Request completed", logData);
    }
  });

  next();
}

export default logger;
