import React, { useState, useEffect } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ServiceCard from '../components/ServiceCard';

function ServicesPage() {
  const { services: allServices } = useCart();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState('');

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');
    const categoryQuery = params.get('category');

    // Load demo services
    setLoading(true);
    setTimeout(() => {
      if (searchQuery) {
        setSearchKeyword(searchQuery);
        performSearch(searchQuery);
      } else if (categoryQuery) {
        setCategory(categoryQuery);
        filterByCategory(categoryQuery);
      } else {
        setServices(allServices);
      }
      setLoading(false);
    }, 300);
  }, [allServices]);

  const filterByCategory = (cat) => {
    const filtered = allServices.filter(s => s.category === cat);
    setServices(filtered);
  };

  const performSearch = (keyword) => {
    const filtered = allServices.filter(service =>
      service.name.toLowerCase().includes(keyword.toLowerCase()) ||
      service.description.toLowerCase().includes(keyword.toLowerCase()) ||
      service.category.toLowerCase().includes(keyword.toLowerCase()) ||
      service.provider.toLowerCase().includes(keyword.toLowerCase())
    );
    setServices(filtered);
  };

  const handleCategoryFilter = (cat) => {
    if (cat === category) {
      setCategory('');
      setServices(allServices);
    } else {
      setCategory(cat);
      filterByCategory(cat);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      performSearch(searchKeyword);
    }
  };

  const filteredServices = services.filter((service) => {
    let priceOk = true;
    if (priceFilter === 'budget') priceOk = service.price < 50;
    if (priceFilter === 'moderate') priceOk = service.price >= 50 && service.price < 150;
    if (priceFilter === 'premium') priceOk = service.price >= 150;

    const ratingOk = service.rating >= ratingFilter;
    return priceOk && ratingOk;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Browse Services</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search services..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <FiSearch /> Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-20">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FiFilter /> Filters
            </h2>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={category === cat}
                      onChange={() => handleCategoryFilter(cat)}
                      className="mr-2"
                    />
                    <span className="capitalize text-sm">{cat.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="all">All Prices</option>
                <option value="budget">Budget (&lt; $50)</option>
                <option value="moderate">Moderate ($50 - $150)</option>
                <option value="premium">Premium (&gt; $150)</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold mb-3">Minimum Rating</h3>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="0">Any Rating</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="text-center py-12">Loading services...</div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No services found. Try adjusting your filters.
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
