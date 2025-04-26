const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startDate: Date,
  endDate: Date,
  name: String,
  email: String,
  phone: String,
  address: String,
  specialRequest: String
});

module.exports = mongoose.model('Booking', bookingSchema);
