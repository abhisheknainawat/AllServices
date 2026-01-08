import React, { useState, useEffect } from 'react';
import { FiBookOpen, FiCheckCircle, FiClock, FiXCircle, FiStar, FiEdit2 } from 'react-icons/fi';
import { getClientBookings, getServiceReviews, createReview } from '../services/api';

function ClientDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    workQuality: 5,
    communication: 5,
    punctuality: 5,
    comment: '',
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getClientBookings();
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBooking) return;

    try {
      await createReview({
        serviceId: selectedBooking.serviceId._id,
        bookingId: selectedBooking._id,
        ...reviewData,
      });
      alert('Review submitted successfully!');
      setShowReviewForm(false);
      setSelectedBooking(null);
      fetchBookings();
    } catch (error) {
      alert('Failed to submit review: ' + error.response?.data?.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock className="inline mr-2" />;
      case 'confirmed':
        return <FiCheckCircle className="inline mr-2 text-blue-600" />;
      case 'completed':
        return <FiCheckCircle className="inline mr-2 text-green-600" />;
      case 'cancelled':
        return <FiXCircle className="inline mr-2 text-red-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <FiBookOpen className="text-3xl text-indigo-600" />
        <h1 className="text-4xl font-bold">My Bookings</h1>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">No bookings yet</p>
          <a href="/services" className="text-indigo-600 hover:underline font-semibold">
            Browse services to get started
          </a>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {booking.serviceId?.name || 'Service'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Booking ID: {booking._id.slice(0, 8)}...
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-semibold text-sm capitalize ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
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
                    <p className="text-xs text-gray-600 uppercase">Total Price</p>
                    <p className="font-semibold text-indigo-600">${booking.totalPrice}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {booking.status === 'completed' && (
                    <button
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowReviewForm(true);
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded font-semibold flex items-center gap-2 transition"
                    >
                      <FiStar /> Leave Review
                    </button>
                  )}
                  <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded font-semibold hover:bg-gray-50 transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showReviewForm && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
            <p className="text-gray-600 mb-6">
              How was {selectedBooking.serviceId?.name}?
            </p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Overall Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewData({ ...reviewData, rating: star })}
                      className={`text-2xl ${
                        star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold mb-2">Work Quality</label>
                  <select
                    value={reviewData.workQuality}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, workQuality: Number(e.target.value) })
                    }
                    className="w-full border rounded px-2 py-1 text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}⭐
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2">Communication</label>
                  <select
                    value={reviewData.communication}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, communication: Number(e.target.value) })
                    }
                    className="w-full border rounded px-2 py-1 text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}⭐
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-2">Punctuality</label>
                  <select
                    value={reviewData.punctuality}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, punctuality: Number(e.target.value) })
                    }
                    className="w-full border rounded px-2 py-1 text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n}⭐
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your Comment</label>
                <textarea
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                  placeholder="Share your experience..."
                  required
                  className="w-full border rounded px-3 py-2 text-sm"
                  rows="4"
                ></textarea>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded transition"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReviewForm(false);
                    setSelectedBooking(null);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 font-bold py-2 rounded hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientDashboard;
