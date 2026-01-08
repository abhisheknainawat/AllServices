import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiPhone, FiMapPin } from 'react-icons/fi';
import { registerUser } from '../services/api';

function RegisterPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState('client');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role,
        phone: formData.phone,
        city: formData.city,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('userName', response.data.user.name);

      alert('Registration successful!');
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Join ServiceHub</h1>
        <p className="text-center text-gray-600 mb-6">
          Create an account to get started
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Role Selection */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-3">I am a:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('client')}
              className={`py-2 rounded font-semibold transition ${
                role === 'client'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => setRole('provider')}
              className={`py-2 rounded font-semibold transition ${
                role === 'provider'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Provider
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Full Name</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Phone</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FiPhone className="text-gray-400 mr-2" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">City</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FiMapPin className="text-gray-400 mr-2" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Your city"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Confirm Password</label>
            <div className="flex items-center border rounded px-3 py-2">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
                className="w-full outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded transition disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
