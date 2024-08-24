import express from 'express';

import flightRoutes from './flightRoutes';
import bookingRoutes from './bookingRoutes';
import locationRoutes from './locationRoutes';

const router = express.Router();

router.use(flightRoutes);
router.use(bookingRoutes);
router.use(locationRoutes);

export default router;
