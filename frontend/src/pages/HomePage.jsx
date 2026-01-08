import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiUsers, FiTrendingUp, FiSearch } from 'react-icons/fi';
import { getAllServices } from '../services/api';
import ServiceCard from '../components/ServiceCard';

function HomePage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServices({ limit: 6 });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = [
    'carpenter',
    'electrician',
    'salon',
    'mechanic',
    'house_keeping',
    'plumber',
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      window.location.href = `/services?search=${encodeURIComponent(searchKeyword)}`;
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Quality Local Services</h1>
          <p className="text-xl mb-8 text-gray-100">
            Connect with skilled professionals for all your service needs
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search services, providers, or categories..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
              >
                <FiSearch /> Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/services?category=${category}`}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition text-center cursor-pointer"
              >
                <div className="text-3xl mb-2">
                  {category === 'carpenter' && '🔨'}
                  {category === 'electrician' && '⚡'}
                  {category === 'salon' && '💇'}
                  {category === 'mechanic' && '🔧'}
                  {category === 'house_keeping' && '🧹'}
                  {category === 'plumber' && '🚰'}
                </div>
                <p className="font-semibold capitalize">{category.replace('_', ' ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Services</h2>
          {loading ? (
            <div className="text-center py-12">Loading services...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              View All Services <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose ServiceHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <FiCheckCircle className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Verified Providers</h3>
              <p className="text-gray-600">
                All service providers are verified and rated by real customers
              </p>
            </div>
            <div className="text-center">
              <FiUsers className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Trusted Community</h3>
              <p className="text-gray-600">
                Join thousands of satisfied customers and providers
              </p>
            </div>
            <div className="text-center">
              <FiTrendingUp className="text-4xl text-pink-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Best Prices</h3>
              <p className="text-gray-600">
                Compare prices and find the best deals for your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Join our community of service providers and clients</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register?role=client"
              className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Book a Service
            </Link>
            <Link
              to="/register?role=provider"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
            >
              Offer Your Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
