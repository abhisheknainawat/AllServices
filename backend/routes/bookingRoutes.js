const express = require('express');
const router = express.Router();
const {
  createBooking,
  getClientBookings,
  getProviderBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
} = require('../controllers/bookingController');
const { authMiddleware, isClient, isProvider } = require('../middleware/auth');

// Protected routes
router.post('/', authMiddleware, isClient, createBooking);
router.get('/client/my-bookings', authMiddleware, isClient, getClientBookings);
router.get('/provider/my-bookings', authMiddleware, isProvider, getProviderBookings);
router.get('/:id', authMiddleware, getBookingById);
router.put('/:id/status', authMiddleware, updateBookingStatus);
router.put('/:id/cancel', authMiddleware, cancelBooking);

module.exports = router;
