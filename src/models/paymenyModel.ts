import mongoose from '../utils/db'

const PaymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['successful', 'failed', 'pending'],
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  transactionId: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Payment', PaymentSchema);
