const Review = require('../models/Review');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const User = require('../models/User');

// Create review
const createReview = async (req, res) => {
  try {
    const { serviceId, bookingId, rating, comment, workQuality, communication, punctuality, isAnonymous } = req.body;

    if (!serviceId || !bookingId || !rating || !comment) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only client from completed booking can review
    if (booking.clientId.toString() !== req.userId || booking.status !== 'completed') {
      return res.status(403).json({ message: 'Not authorized to review this service' });
    }

    const review = new Review({
      serviceId,
      bookingId,
      clientId: req.userId,
      providerId: booking.providerId,
      rating,
      comment,
      workQuality,
      communication,
      punctuality,
      isAnonymous,
    });

    await review.save();

    // Update service rating
    const reviews = await Review.find({ serviceId });
    const avgRating = reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;

    await Service.findByIdAndUpdate(
      serviceId,
      { rating: avgRating, totalReviews: reviews.length },
      { new: true }
    );

    // Update provider rating
    const providerReviews = await Review.find({ providerId: booking.providerId });
    const providerAvgRating = providerReviews.reduce((sum, rev) => sum + rev.rating, 0) / providerReviews.length;

    await User.findByIdAndUpdate(
      booking.providerId,
      { rating: providerAvgRating, totalReviews: providerReviews.length },
      { new: true }
    );

    res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating review', error: error.message });
  }
};

// Get reviews for service
const getServiceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ serviceId: req.params.serviceId })
      .populate('clientId', 'name profilePhoto');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get reviews for provider
const getProviderReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.providerId })
      .populate('clientId', 'name profilePhoto')
      .populate('serviceId', 'name');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('clientId')
      .populate('serviceId')
      .populate('providerId');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review', error: error.message });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.clientId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      message: 'Review updated successfully',
      review: updatedReview,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating review', error: error.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.clientId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

module.exports = {
  createReview,
  getServiceReviews,
  getProviderReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
