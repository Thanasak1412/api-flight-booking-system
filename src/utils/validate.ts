import type { Request, Response, NextFunction } from 'express';
import { type ContextRunner } from 'express-validator';

const validate = (validations: ContextRunner[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        return res.status(400).json({ message: result.array() });
      }
    }

    next();
  };
};

export { validate };
