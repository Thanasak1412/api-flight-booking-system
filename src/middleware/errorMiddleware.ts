import type { Request, Response, NextFunction } from 'express';

import { errorLogger } from '../config/logger';

const catchErrors = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status || 500;

  // Log error details securely
  errorLogger.error({
    message: err.message,
    stack: err.stack,
    status: err.status || 500,
    url: req.originalUrl,
  });

  // * Send error response only if the wasn't already sent
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      message: statusCode === 500 ? 'Internal Server Error' : err.message,
    });
  }
};

export { catchErrors };
