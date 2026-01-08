import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiHome, FiGrid, FiLogOut, FiUser, FiLogIn, FiShoppingCart, FiPackage } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

function Navbar({ isAuthenticated, userRole, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsOpen(false);
  };

  const handleDashboard = () => {
    if (userRole === 'client') {
      navigate('/dashboard/client');
    } else if (userRole === 'provider') {
      navigate('/dashboard/provider');
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <FiGrid className="text-2xl" />
            <span>ServiceHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200 transition">
              Home
            </Link>
            <Link to="/services" className="hover:text-gray-200 transition">
              Services
            </Link>
            {isAuthenticated && userRole === 'provider' && (
              <Link to="/add-service" className="hover:text-gray-200 transition font-semibold text-yellow-200">
                Add Service
              </Link>
            )}
            <Link to="/cart" className="flex items-center hover:text-gray-200 transition relative">
              <FiShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/orders" className="hover:text-gray-200 transition">
              Orders
            </Link>

            {isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="hover:text-gray-200 transition"
                >
                  Dashboard
                </button>
                <Link to="/profile" className="hover:text-gray-200 transition">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="border border-white px-4 py-2 rounded hover:bg-white hover:text-indigo-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4">
            <Link
              to="/"
              className="block hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/services"
              className="block hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            {isAuthenticated && userRole === 'provider' && (
              <Link
                to="/add-service"
                className="block hover:text-gray-200 font-semibold text-yellow-200"
                onClick={() => setIsOpen(false)}
              >
                Add Service
              </Link>
            )}
            <Link
              to="/cart"
              className="flex items-center hover:text-gray-200 relative"
              onClick={() => setIsOpen(false)}
            >
              <FiShoppingCart className="mr-2" />
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/orders"
              className="flex items-center hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <FiPackage className="mr-2" />
              Orders
            </Link>

            {isAuthenticated ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="block w-full text-left hover:text-gray-200"
                >
                  Dashboard
                </button>
                <Link
                  to="/profile"
                  className="block hover:text-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block border border-white px-4 py-2 rounded hover:bg-white hover:text-indigo-600 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-white text-indigo-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
