import mongoose from '../utils/db';

const locationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  airportCode: {
    type: String,
    required: true,
  },
  airportName: {
    type: String,
    required: true,
  },
});

locationSchema.index({ city: 1, country: 1 });

export default mongoose.model('Location', locationSchema);
