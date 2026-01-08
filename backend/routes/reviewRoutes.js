const express = require('express');
const router = express.Router();
const {
  createReview,
  getServiceReviews,
  getProviderReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');
const { authMiddleware, isClient } = require('../middleware/auth');

// Public routes
router.get('/service/:serviceId', getServiceReviews);
router.get('/provider/:providerId', getProviderReviews);
router.get('/:id', getReviewById);

// Protected routes
router.post('/', authMiddleware, isClient, createReview);
router.put('/:id', authMiddleware, isClient, updateReview);
router.delete('/:id', authMiddleware, isClient, deleteReview);

module.exports = router;
