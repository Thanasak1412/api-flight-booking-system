import mongoose from '../utils/db'

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    index: true,
  },
  airline: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  arrivalDate: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

flightSchema.index({ origin: 1, destination: 1, departureDate: 1 });

export default mongoose.model('Flight', flightSchema);
