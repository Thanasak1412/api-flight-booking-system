import express from 'express';

import { getLocations } from '../controllers/locationController';

const locationRouter = express.Router();

locationRouter.get('/locations', getLocations);

export default locationRouter;
