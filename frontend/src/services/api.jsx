import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const getUserProfile = () => api.get('/auth/profile');
export const updateUserProfile = (userData) => api.put('/auth/profile', userData);
export const getAllProviders = () => api.get('/auth/providers');
export const getProviderById = (id) => api.get(`/auth/providers/${id}`);

// Service APIs
export const getAllServices = (params) => api.get('/services', { params });
export const getServiceById = (id) => api.get(`/services/${id}`);
export const getServicesByProvider = (providerId) => api.get(`/services/provider/${providerId}`);
export const getServicesByCategory = (category) => api.get(`/services/category/${category}`);
export const searchServices = (keyword) => api.get('/services/search', { params: { keyword } });
export const createService = (serviceData) => api.post('/services', serviceData);
export const updateService = (id, serviceData) => api.put(`/services/${id}`, serviceData);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Booking APIs
export const createBooking = (bookingData) => api.post('/bookings', bookingData);
export const getClientBookings = () => api.get('/bookings/client/my-bookings');
export const getProviderBookings = () => api.get('/bookings/provider/my-bookings');
export const getBookingById = (id) => api.get(`/bookings/${id}`);
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}/status`, { status });
export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

// Review APIs
export const getServiceReviews = (serviceId) => api.get(`/reviews/service/${serviceId}`);
export const getProviderReviews = (providerId) => api.get(`/reviews/provider/${providerId}`);
export const getReviewById = (id) => api.get(`/reviews/${id}`);
export const createReview = (reviewData) => api.post('/reviews', reviewData);
export const updateReview = (id, reviewData) => api.put(`/reviews/${id}`, reviewData);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

export default api;
