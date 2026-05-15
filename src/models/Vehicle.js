const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A vehicle must have a name'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'A vehicle must have a type'],
    enum: ['Sedan', 'SUV', 'Premium SUV', 'Tempo Traveller', 'Luxury'],
  },
  model: String,
  seats: Number,
  pricePerKm: {
    type: Number,
    required: [true, 'A vehicle must have a price per km'],
  },
  basePrice: Number,
  image: {
    type: String,
    default: '/default-car.png',
  },
  features: [String],
  isAvailable: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
