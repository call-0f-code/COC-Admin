import { NextFunction,Response,Request } from "express";


/**
 * A custom error type that carries an HTTP status code.
 */
export class ApiError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Standard structure for API error responses
 */
interface ErrorResponse {
  error: boolean;
  message: string;
  stack?: string;
}

/**
 * Express middleware to catch all errors and send JSON response.
 */
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const status = err instanceof ApiError ? err.statusCode : 500;
  const message =
    err instanceof ApiError ? err.message : "Internal Server Error";

  const responseBody: ErrorResponse = {
    error: true,
    message,
  };

  // Include stack trace in development for debugging
  if (process.env.NODE_ENV === "development" && err instanceof Error) {
    responseBody.stack = err.stack;
  }

  res.status(status).json(responseBody);
}
