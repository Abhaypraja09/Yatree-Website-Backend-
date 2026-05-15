const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: String,
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  subject: {
    type: String,
    enum: ['General Inquiry', 'Booking Question', 'Custom Tour', 'Callback Request', 'Feedback'],
    default: 'General Inquiry',
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Resolved', 'Archived'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Inquiry', inquirySchema);
