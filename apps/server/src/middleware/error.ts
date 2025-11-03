import type { Request, Response, NextFunction } from "express";
import { respondWithError } from "../utils/json";

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
  const message = err.message || "Internal Server Error";

  if (statusCode >= 500) {
    console.log(err.message);
  }

  respondWithError(res, statusCode, message);
}
