const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public route for creating a booking (e.g., from the website)
router.post('/', bookingController.createBooking);

// Protected Admin Routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.get('/', bookingController.getAllBookings);
router.get('/stats', bookingController.getBookingStats);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
