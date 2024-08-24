import express from 'express';

import flightRoutes from './flightRoutes';
import bookingRoutes from './bookingRoutes';

const router = express.Router();

router.use(flightRoutes);
router.use(bookingRoutes);

export default router;
