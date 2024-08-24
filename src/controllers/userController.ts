import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';
import { JWT_SECRET } from '../config/env';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name, role } = req.body;

  try {
    const user = new User({
      email,
      password,
      name,
      role,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export { register, login };
