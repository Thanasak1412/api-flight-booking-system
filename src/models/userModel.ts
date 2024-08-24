import bcrypt from 'bcrypt';

import mongoose from '../utils/db';
import type { IUser, IUserMethods } from '../types/user';

const userSchema = new mongoose.Schema<IUser, {}, IUserMethods>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  booking: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  // hash password
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  }
});

// Compare password
userSchema.method('comparePassword', function (inputPassword: string) {
  return bcrypt.compare(inputPassword, this.password);
});

// Validation email
userSchema.path('email').validate((email: string) => {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  return emailRegex.test(email);
}, 'The e-mail field cannot be empty.');

export default mongoose.model('User', userSchema);
