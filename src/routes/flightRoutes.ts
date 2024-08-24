import express from 'express';

import { flightSearch } from '../controllers/flightController';

const flightRouter = express.Router();

flightRouter.get('/flights/search', flightSearch);

export default flightRouter;
