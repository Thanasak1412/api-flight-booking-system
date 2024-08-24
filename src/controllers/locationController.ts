import type { Request, Response, NextFunction } from 'express';

import Location from '../models/locationModel';
import { HttpError } from '../types/error';

const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const searchTerm = req.query.q;

    console.log('searchTerm => ', searchTerm);

    const locations = await Location.find({
      city: {
        $regex: searchTerm,
        $options: 'i',
      },
    }).limit(10);

    if (!locations.length) {
      const error = new Error('Location not found') as HttpError;

      error.status = 404;

      return next(error);
    }

    res.status(200).json({
      message: 'Get location successful',
      data: locations,
    });
  } catch (error) {
    next(error);
  }
};

export { getLocations };
