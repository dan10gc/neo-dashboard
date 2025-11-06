import type { Request, Response, NextFunction } from "express";
import { respondWithError } from "../utils/json";
import { logger } from "../utils/logger";

interface CustomError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  let message: string;

  if (statusCode >= 500) {
    logger.error("Internal server error:", {
      message: err.message,
      stack: err.stack,
    });
    message = "An unexpected error occurred. Please try again later.";
  } else {
    // for 4xx errors, show the actual error message
    message = err.message || "Bad Request";
  }

  respondWithError(res, statusCode, message);
}
