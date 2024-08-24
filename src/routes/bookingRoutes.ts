import express from 'express';
import { body } from 'express-validator';

import { createBooking } from '../controllers/bookingController';
import { validate } from '../utils/validate';
import { passportNumberRegex } from '../config/config';

const paymentRouter = express.Router();

paymentRouter.post(
  '/booking',
  validate([
    body('token').isString().notEmpty(),
    body('bookingId').isString().isMongoId(),
    body('totalAmount').isNumeric().isCurrency().notEmpty(),
    // * passengers: [{ fullName: "full name", dateOfBirth: "2024-08-24T15:00:02.000Z", passportNumber: "546431005" }]
    body('passengers.*.fullName').trim().escape(),
    body('passengers.*.dateOfBirth').isISO8601().toDate(),
    body('passengers.*.passportNumber').custom((passport: string) => {
      if (!passportNumberRegex.test(passport)) {
        throw new Error('Invalid passport number format');
      }

      return true;
    }),
    body('flightDetails.id').isMongoId(),
    body('flightDetails.origin').trim().escape(),
    body('flightDetails.destination').trim().escape(),
  ]),
  createBooking
);

export default paymentRouter;
