const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide service name'],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        'carpenter',
        'guitarist',
        'salon',
        'electrician',
        'technician',
        'house_keeping',
        'laundry',
        'courses',
        'mua',
        'mechanic',
        'plumber',
        'painter',
        'other',
      ],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide service price'],
      min: 0,
    },
    priceType: {
      type: String,
      enum: ['hourly', 'fixed', 'daily'],
      default: 'fixed',
    },
    images: [
      {
        type: String,
      },
    ],
    workSamples: [
      {
        url: String,
        description: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    availability: {
      monday: { start: String, end: String, available: Boolean },
      tuesday: { start: String, end: String, available: Boolean },
      wednesday: { start: String, end: String, available: Boolean },
      thursday: { start: String, end: String, available: Boolean },
      friday: { start: String, end: String, available: Boolean },
      saturday: { start: String, end: String, available: Boolean },
      sunday: { start: String, end: String, available: Boolean },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
