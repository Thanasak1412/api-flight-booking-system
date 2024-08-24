import type { NextFunction, Request, Response } from 'express';

import { _mockFlights } from '../mock/_flightData';
import { HttpError } from '../types/error';

const flightSearch = (req: Request, res: Response, next: NextFunction) => {
  const { origin, destination, departureDate } = req.query;

  //   Filter flights based on search criteria
  const filteredFlights = _mockFlights.filter(
    (flight) =>
      flight.origin === origin &&
      flight.destination === destination &&
      flight.departureDate.startsWith(String(departureDate))
  );

  if (!filteredFlights.length) {
    const error = new Error(
      'No flights found for the specified criteria'
    ) as HttpError;

    error.status = 404;

    return next(error);
  }

  return res.status(200).json({
    message: 'get flight successful',
    data: filteredFlights,
  });
};

export { flightSearch };
