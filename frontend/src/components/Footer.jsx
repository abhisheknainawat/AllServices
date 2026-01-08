import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">ServiceHub</h3>
            <p className="text-sm">
              Connecting service providers with clients. Quality, reliable, and affordable services at your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/services" className="hover:text-white transition">Services</a></li>
              <li><a href="/register" className="hover:text-white transition">Become a Provider</a></li>
              <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Popular Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Carpenter</a></li>
              <li><a href="#" className="hover:text-white transition">Electrician</a></li>
              <li><a href="#" className="hover:text-white transition">House Keeping</a></li>
              <li><a href="#" className="hover:text-white transition">Mechanic</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition text-xl">
                <FiFacebook />
              </a>
              <a href="#" className="hover:text-white transition text-xl">
                <FiTwitter />
              </a>
              <a href="#" className="hover:text-white transition text-xl">
                <FiInstagram />
              </a>
              <a href="#" className="hover:text-white transition text-xl">
                <FiLinkedin />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 ServiceHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
