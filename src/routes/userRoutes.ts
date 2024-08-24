import express from 'express';
import { body } from 'express-validator';

import { register, login } from '../controllers/userController';
import { validate } from '../utils/validate';
import { UserRoles } from '../types/user';

const userRouter = express.Router();

userRouter.post(
  '/auth/register',
  validate([
    body('email').isEmail().normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .isStrongPassword()
      .withMessage('Password must be strong'),
    body('name').trim().escape(),
    body('role')
      .isIn([UserRoles.CUSTOMER, UserRoles.ADMIN])
      .withMessage('Invalid role'),
  ]),
  register
);

userRouter.post(
  '/auth/login',
  validate([
    body('email').isEmail().normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .isStrongPassword()
      .withMessage('Password must be strong'),
  ]),
  login
);

export default userRouter;
