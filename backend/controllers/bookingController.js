const Booking = require('../models/Booking');
const Service = require('../models/Service');

// Create booking
const createBooking = async (req, res) => {
  try {
    const { serviceId, date, startTime, endTime, location, description, totalPrice, paymentMethod } = req.body;

    if (!serviceId || !date || !startTime || !endTime || !totalPrice) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const booking = new Booking({
      serviceId,
      clientId: req.userId,
      providerId: service.providerId,
      date,
      startTime,
      endTime,
      location,
      description,
      totalPrice,
      paymentMethod,
    });

    await booking.save();

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// Get bookings for client
const getClientBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ clientId: req.userId })
      .populate('serviceId')
      .populate('providerId', 'name phone profilePhoto');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get bookings for provider
const getProviderBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ providerId: req.userId })
      .populate('serviceId')
      .populate('clientId', 'name phone address');

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

// Get booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('serviceId')
      .populate('clientId')
      .populate('providerId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only provider can confirm or complete
    if (booking.providerId.toString() !== req.userId && status !== 'cancelled') {
      return res.status(403).json({ message: 'Not authorized to update this booking' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: 'Booking status updated successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

// Cancel booking
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only client or provider can cancel
    if (booking.clientId.toString() !== req.userId && booking.providerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to cancel this booking' });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    res.status(200).json({
      message: 'Booking cancelled successfully',
      booking: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error: error.message });
  }
};

module.exports = {
  createBooking,
  getClientBookings,
  getProviderBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking,
};
