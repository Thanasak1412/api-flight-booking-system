import type { IUser } from './user';

declare global {
  namespace Express {
    interface Request {
      user: Omit<IUser, 'password'> | null;
    }

    interface Response {
      user: Omit<IUser, 'password'> | null;
    }
  }
}
