const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ message: 'Booking successful!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookings = async (req, res) => {
  try {
    const { userId } = req.query;
    let bookings;

    if (userId) {
      bookings = await Booking.find({ userId });
    } else {
      bookings = await Booking.find(); // For admin
    }

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};
