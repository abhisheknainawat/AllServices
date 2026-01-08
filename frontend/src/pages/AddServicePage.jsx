import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { createService } from '../services/api';

function AddServicePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    priceType: 'fixed',
    description: '',
    images: [],
  });

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

  const priceTypes = [
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
    { value: 'fixed', label: 'Fixed' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await createService({
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        priceType: formData.priceType,
        description: formData.description,
        images: formData.images,
      });

      // Success
      alert(`Service "${formData.name}" has been created successfully!`);
      
      // Reset form
      setFormData({
        name: '',
        category: '',
        price: '',
        priceType: 'fixed',
        description: '',
        images: [],
      });

      // Redirect to provider dashboard
      setTimeout(() => {
        navigate('/dashboard/provider');
      }, 1500);
    } catch (err) {
      console.error('Error creating service:', err);
      setError(err.response?.data?.message || 'Failed to create service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 font-semibold"
        >
          <FiArrowLeft /> Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Add Your Service</h1>
          <p className="text-gray-600 text-lg">List your service and start earning with ServiceHub</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 font-semibold">Error: {error}</p>
            </div>
          )}

          {/* Service Name */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Service Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., Professional Home Cleaning"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter a clear, descriptive name for your service</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat.replace('_', ' ').charAt(0).toUpperCase() + cat.replace('_', ' ').slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price and Price Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Price *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 font-bold text-lg">$</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 text-gray-700">
                Price Type *
              </label>
              <select
                name="priceType"
                value={formData.priceType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {priceTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your service in detail. Include what's included, your experience, and any special features."
              rows="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Minimum 50 characters recommended</p>
          </div>

          {/* Info Box */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-bold text-indigo-900 mb-2">Pro Tips for Better Results</h3>
            <ul className="text-sm text-indigo-800 space-y-1">
              <li>✓ Use clear and specific service names</li>
              <li>✓ Write detailed descriptions with key features</li>
              <li>✓ Price competitively with market rates</li>
              <li>✓ Include your experience and certifications</li>
              <li>✓ Respond quickly to customer inquiries</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FiPlus /> {loading ? 'Publishing...' : 'Publish Service'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
              className="flex-1 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 font-bold py-3 rounded-lg transition"
            >
              Cancel
            </button>
          </div>

          {/* Terms */}
          <div className="text-xs text-gray-500 text-center pt-4 border-t">
            <p>By publishing this service, you agree to our Terms of Service and Community Guidelines.</p>
          </div>
        </form>

        {/* Success Stories */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Why List Your Service With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
              <p className="font-semibold mb-2">Active Users</p>
              <p className="text-sm text-gray-600">Reach thousands of potential customers</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">0% Commission</div>
              <p className="font-semibold mb-2">First 3 Months</p>
              <p className="text-sm text-gray-600">Keep 100% of your earnings initially</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">24/7</div>
              <p className="font-semibold mb-2">Support</p>
              <p className="text-sm text-gray-600">We're here to help you succeed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddServicePage;
