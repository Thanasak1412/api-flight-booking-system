import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';
import { JWT_SECRET } from '../config/env';
import { errorLogger } from '../config/logger';
import { HttpError } from '../types/error';

// Middleware to protect routes
const protectRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = null;

  // Check for token is headers
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user to request object
      req.user = await User.findById(
        typeof decoded !== 'string' ? decoded.id : ''
      ).select('-password');

      next();
    } catch (err: any) {
      errorLogger.error({
        message: err.message,
        stack: err.stack,
        status: err.status,
      });

      const error = new Error('Not authorized, token failed') as HttpError;

      error.status = 401;

      next(error);
    }
  }

  if (!token) {
    return res.status(401).json({
      message: 'Not authorized, token failed',
    });
  }
};

export { protectRoutes };
