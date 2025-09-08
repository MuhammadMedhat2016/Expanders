import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';
type ErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const errorHandler: ErrorHandler = (error, req, res, next) => {
  console.log(error);
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      status: error.statusMessage,
      message: error.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went really wrong',
    });
  }
};
