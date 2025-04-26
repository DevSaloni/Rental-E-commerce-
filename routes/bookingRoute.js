const express = require('express');
const router = express.Router();
const {createBooking,getBookings} = require('../controllers/bookingController');

router.post('/book', createBooking);
router.get('/bookings', getBookings); // NEW ROUTE to fetch bookings


module.exports = router;
