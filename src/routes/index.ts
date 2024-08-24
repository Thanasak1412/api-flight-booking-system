import express from 'express';

import flightRoutes from './flightRoutes';

const router = express.Router();

router.use(flightRoutes);

export default router;
