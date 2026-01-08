require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
console.log('Loading routes...');
try {
  app.use('/api/auth', require('./routes/authRoutes'));
  console.log('Auth routes loaded');
  app.use('/api/services', require('./routes/serviceRoutes'));
  console.log('Service routes loaded');
  app.use('/api/bookings', require('./routes/bookingRoutes'));
  console.log('Booking routes loaded');
  app.use('/api/reviews', require('./routes/reviewRoutes'));
  console.log('Review routes loaded');
} catch (e) {
  console.error('Error loading routes:', e);
}

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
