import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiBriefcase, FiCheckCircle, FiClock } from 'react-icons/fi';
import { getServicesByProvider, createService, updateService, deleteService, getProviderBookings } from '../services/api';

function ProviderDashboard() {
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [activeTab, setActiveTab] = useState('services');
  const [formData, setFormData] = useState({
    name: '',
    category: 'carpenter',
    description: '',
    price: '',
    priceType: 'fixed',
  });

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const servicesResponse = await getServicesByProvider(userId);
      setServices(servicesResponse.data);

      const bookingsResponse = await getProviderBookings();
      setBookings(bookingsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.price) {
      alert('Please fill all required fields');
      return;
    }

    try {
      if (editingService) {
        await updateService(editingService._id, formData);
        alert('Service updated successfully!');
      } else {
        await createService(formData);
        alert('Service created successfully!');
      }

      setShowForm(false);
      setEditingService(null);
      setFormData({
        name: '',
        category: 'carpenter',
        description: '',
        price: '',
        priceType: 'fixed',
      });
      fetchData();
    } catch (error) {
      alert('Error saving service: ' + error.response?.data?.message);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price,
      priceType: service.priceType,
    });
    setShowForm(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(serviceId);
        alert('Service deleted successfully!');
        fetchData();
      } catch (error) {
        alert('Error deleting service: ' + error.response?.data?.message);
      }
    }
  };

  const categories = [
    'carpenter',
    'guitarist',
    'salon',
    'electrician',
    'technician',
    'house_keeping',
    'laundry',
    'courses',
    'mua',
    'mechanic',
    'plumber',
    'painter',
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading your dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <FiBriefcase className="text-3xl text-indigo-600" />
        <h1 className="text-4xl font-bold">Provider Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('services')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'services'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          My Services
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 font-semibold border-b-2 transition ${
            activeTab === 'bookings'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          Bookings
        </button>
      </div>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div>
          {!showForm && (
            <button
              onClick={() => {
                setEditingService(null);
                setFormData({
                  name: '',
                  category: 'carpenter',
                  description: '',
                  price: '',
                  priceType: 'fixed',
                });
                setShowForm(true);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded font-semibold flex items-center gap-2 mb-6 transition"
            >
              <FiPlus /> Add New Service
            </button>
          )}

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingService ? 'Edit Service' : 'Create New Service'}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Service Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g., Home Carpentry"
                      required
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Category*</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description*</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    placeholder="Describe your service in detail..."
                    required
                    className="w-full border rounded px-3 py-2"
                    rows="4"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Price*</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      placeholder="100"
                      required
                      min="1"
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Price Type*</label>
                    <select
                      name="priceType"
                      value={formData.priceType}
                      onChange={handleFormChange}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="fixed">Fixed</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded transition"
                  >
                    {editingService ? 'Update Service' : 'Create Service'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="border border-gray-300 text-gray-700 font-bold px-6 py-2 rounded hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {services.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No services yet</p>
              <button
                onClick={() => setShowForm(true)}
                className="text-indigo-600 hover:underline font-semibold"
              >
                Create your first service
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {services.map((service) => (
                <div key={service._id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex gap-4 text-sm">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded capitalize">
                          {service.category.replace('_', ' ')}
                        </span>
                        <span className="font-semibold text-indigo-600">
                          ${service.price}/{service.priceType}
                        </span>
                        {service.rating > 0 && (
                          <span className="text-yellow-500">
                            ⭐ {service.rating.toFixed(1)} ({service.totalReviews} reviews)
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(service)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="grid gap-4">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600">No bookings yet</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {booking.serviceId?.name || 'Service'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Client: {booking.clientId?.name || 'N/A'}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm capitalize flex items-center gap-2 ${
                    booking.status === 'confirmed'
                      ? 'bg-blue-100 text-blue-800'
                      : booking.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {booking.status === 'confirmed' && <FiCheckCircle />}
                    {booking.status === 'pending' && <FiClock />}
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-b">
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Date</p>
                    <p className="font-semibold">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Time</p>
                    <p className="font-semibold">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Location</p>
                    <p className="font-semibold">{booking.location?.city || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 uppercase">Price</p>
                    <p className="font-semibold text-indigo-600">${booking.totalPrice}</p>
                  </div>
                </div>

                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-50 transition">
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ProviderDashboard;
