import mongoose from '../utils/db';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  flight: {
    type: mongoose.Types.ObjectId,
    ref: 'Flight',
    required: true,
  },
  passengers: [
    {
      fullName: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
      passportNumber: {
        type: String,
      },
    },
  ],
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
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

export default mongoose.model('Booking', bookingSchema);
