import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar, FiMapPin, FiDollarSign, FiBook, FiArrowLeft, FiMessageSquare, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function ServiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services: allServices, addToCart } = useCart();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hours, setHours] = useState(1);
  const [added, setAdded] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  // Demo reviews data
  const demoReviews = [
    {
      _id: "r1",
      clientName: "Sarah Johnson",
      rating: 5,
      comment: "Excellent service! Professional and on time. Highly recommended.",
      date: "2024-01-15"
    },
    {
      _id: "r2",
      clientName: "Mike Davis",
      rating: 4,
      comment: "Great work! Very satisfied with the quality. Will book again.",
      date: "2024-01-10"
    },
    {
      _id: "r3",
      clientName: "Emily Chen",
      rating: 5,
      comment: "Outstanding! Exceeded my expectations. Thank you!",
      date: "2024-01-05"
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const foundService = allServices.find(s => s._id === id);
      setService(foundService || null);
      setLoading(false);
    }, 300);
  }, [id, allServices]);

  const handleAddToCart = () => {
    if (service) {
      addToCart(service, hours);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactMessage.trim()) {
      alert('Please enter a message');
      return;
    }
    alert(`Message sent to ${service.providerId?.name || 'provider'}: "${contactMessage}"`);
    setContactMessage('');
    setShowContactForm(false);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">Loading service details...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <button
          onClick={() => navigate('/services')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-semibold"
      >
        <FiArrowLeft /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Service Image */}
          <div className="bg-gradient-to-r from-indigo-400 to-pink-400 rounded-lg h-96 mb-8 flex items-center justify-center text-white text-6xl font-bold overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              {service.category.toUpperCase().charAt(0)}
            </div>
          </div>

          {/* Service Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{service.name}</h1>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    fill={i < Math.floor(service.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="ml-4 text-gray-600 text-lg">
                {service.rating.toFixed(1)} ({service.totalReviews} reviews)
              </span>
            </div>

            {/* Category & Price */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b">
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full capitalize font-semibold">
                {service.category.replace('_', ' ')}
              </span>
              <div className="text-3xl font-bold text-indigo-600 flex items-center">
                <FiDollarSign className="text-2xl" /> {service.price}/{service.priceType}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Service</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{service.description}</p>
            </div>

            {/* Key Features */}
            <div className="bg-indigo-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FiCheck className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Professional Service</p>
                    <p className="text-sm text-gray-600">Experienced and skilled professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheck className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Quality Assured</p>
                    <p className="text-sm text-gray-600">High quality results guaranteed</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheck className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">On-Time Delivery</p>
                    <p className="text-sm text-gray-600">Always arrives on schedule</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiCheck className="text-green-500 text-xl mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Affordable Pricing</p>
                    <p className="text-sm text-gray-600">Best value for money</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider Card */}
            <div className="bg-white border-2 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Service Provider</h2>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-lg">{service.provider}</p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <FiMapPin className="text-indigo-600" /> Local Service Provider
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FiStar key={i} fill={i < Math.floor(service.rating) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-semibold">{service.rating.toFixed(1)} rating</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center gap-2">
                  <FiMessageSquare /> Contact
                </button>
              </div>
            </div>

            {/* Customer Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
              <div className="space-y-4">
                {demoReviews.map((review) => (
                  <div key={review._id} className="border rounded-lg p-5 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-bold text-lg">{review.clientName}</p>
                        <div className="flex text-yellow-400 text-sm mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} fill={i < review.rating ? 'currentColor' : 'none'} size={14} />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Booking/Add to Cart */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20 border-2 border-indigo-100">
            <h3 className="font-bold text-xl mb-4">Add to Cart</h3>

            <div className="mb-6">
              <p className="text-gray-600 mb-2">Select Hours/Units</p>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setHours(Math.max(1, hours - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-4 py-2 border-l border-r font-bold text-lg">{hours}</span>
                <button
                  onClick={() => setHours(hours + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-sm text-gray-600 mb-1">Total Price</p>
              <p className="text-3xl font-bold text-indigo-600">
                ${(service.price * hours).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500 mt-1">${service.price} × {hours} {service.priceType}(s)</p>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition mb-3 flex items-center justify-center gap-2"
            >
              <FiShoppingCart /> Add to Cart
            </button>

            {added && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-center font-semibold">
                ✓ Added to cart!
              </div>
            )}

            <button
              onClick={() => navigate('/services')}
              className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold py-2 rounded-lg transition"
            >
              Continue Shopping
            </button>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>✓ Secure booking</strong><br/>
                <strong>✓ 24-hour support</strong><br/>
                <strong>✓ Money-back guarantee</strong><br/>
                <strong>✓ Free cancellation</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Contact Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6 border-b">
                <h3 className="text-xl font-bold">Contact Provider</h3>
              </div>
              <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Service</label>
                  <input 
                    type="text" 
                    value={service.name} 
                    disabled 
                    className="w-full px-3 py-2 border rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Message *</label>
                  <textarea 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServiceDetailPage;
