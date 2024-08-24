import type { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';

import { STRIPE_SECRET_KEY } from '../config/env';
import Payment from '../models/paymentModel';
import Booking from '../models/bookingModel';
import { encrypt } from '../utils/secure-data';

const stripe = new Stripe(STRIPE_SECRET_KEY);

const createBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, totalAmount, flightDetails, passengers } = req.body;
    const { id: flightId, origin, destination } = flightDetails;

    const newBooking = new Booking({
      user: req.user?.id,
      flight: flightId,
      passengers,
      totalPrice: totalAmount,
    });

    const charge = await stripe.charges.create({
      amount: totalAmount,
      source: token,
      currency: 'thb',
      description: `Flight booking from ${origin} to ${destination}`,
      metadata: {
        booking_id: newBooking.id,
        flight_id: flightId,
        passengers: passengers.length,
      },
    });

    await newBooking.save();

    // Store the payment detail
    const payment = new Payment({
      booking: newBooking._id,
      paymentAmount: charge.amount,
      paymentMethod: charge.payment_method,
      paymentStatus: charge.status,
      transactionId: charge.id,
    });

    // Save the payment detail
    await payment.save();

    if (!charge.id) {
      throw new Error('Booking or payment failed');
    }

    res.status(201).json({
      success: true,
      message: 'Payment successful',
      data: {
        charge,
        payment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { createBooking };
