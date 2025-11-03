/**
 * Base API Error class
 */

export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
/**
 * Returns 400
 */
export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, 400);
  }
}

/**
 * Returns a 401 error when authentication fails.
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, 401);
  }
}
/**
 * Returns a 403 error when the user is authenticated but not authorized to access a resource.
 */
export class ForbiddenError extends ApiError {
  constructor(message: string) {
    super(message, 403);
  }
}
/**
 * Returns a 404
 */
export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, 404);
  }
}

/**
 * Returns a 409 - Conflict (e.g., email already in use)
 */
export class ConflictError extends ApiError {
  constructor(message: string) {
    super(message, 409);
  }
}

/**
 * Returns a 500 - Internal Server Error
 */
export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500, false);
  }
}