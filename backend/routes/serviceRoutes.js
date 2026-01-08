const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  getServicesByProvider,
  updateService,
  deleteService,
  getServicesByCategory,
  searchServices,
} = require('../controllers/serviceController');
const { authMiddleware, isProvider } = require('../middleware/auth');

// Public routes
router.get('/', getAllServices);
router.get('/search', searchServices);
router.get('/category/:category', getServicesByCategory);
router.get('/:id', getServiceById);
router.get('/provider/:providerId', getServicesByProvider);

// Protected routes (provider only)
router.post('/', authMiddleware, isProvider, createService);
router.put('/:id', authMiddleware, isProvider, updateService);
router.delete('/:id', authMiddleware, isProvider, deleteService);

module.exports = router;
