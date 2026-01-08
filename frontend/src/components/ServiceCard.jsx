import React, { useState } from 'react';
import { FiStar, FiMapPin, FiDollarSign, FiShoppingCart } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ServiceCard({ service }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(service, 1);
    setShowAddedNotification(true);
    setTimeout(() => setShowAddedNotification(false), 2000);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden h-full flex flex-col">
        {/* Image */}
        <Link to={`/service/${service._id}`} className="block">
          <div className="h-48 bg-gradient-to-r from-indigo-400 to-pink-400 relative overflow-hidden">
            {service.images && service.images[0] ? (
              <img
                src={service.images[0]}
                alt={service.name}
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-3xl font-bold">
                {service.category.toUpperCase().charAt(0)}
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          <Link to={`/service/${service._id}`}>
            <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-indigo-600 transition">
              {service.name}
            </h3>
          </Link>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {service.description}
          </p>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  fill={i < Math.floor(service.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">
              ({service.totalReviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-4 mt-auto">
            <div className="flex items-center text-lg font-bold text-indigo-600">
              <FiDollarSign className="text-sm" />
              {service.price}
              <span className="text-xs text-gray-500 ml-1">/{service.priceType}</span>
            </div>
            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
              {service.category}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/service/${service._id}`}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg transition text-center"
            >
              View Details
            </Link>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
            >
              <FiShoppingCart /> Add
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {showAddedNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          ✓ Added to cart!
        </div>
      )}
    </>
  );
}

export default ServiceCard;
