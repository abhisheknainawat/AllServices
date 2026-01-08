import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiSave } from 'react-icons/fi';
import { getUserProfile, updateUserProfile } from '../services/api';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      country: '',
    },
    bio: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserProfile();
      setProfile(response.data);
      setFormData({
        name: response.data.name,
        phone: response.data.phone,
        address: response.data.address || {},
        bio: response.data.bio || '',
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      alert('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address_')) {
      const addressField = name.split('_')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      alert('Profile updated successfully!');
      setIsEditing(false);
      fetchProfile();
    } catch (error) {
      alert('Failed to update profile: ' + error.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FiUser className="text-3xl text-indigo-600" />
          <h1 className="text-4xl font-bold">My Profile</h1>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded font-semibold flex items-center gap-2 transition"
          >
            <FiEdit2 /> Edit Profile
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {!isEditing ? (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className="pb-6 border-b">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-pink-400 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <span className="inline-block mt-2 bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold capitalize">
                  {profile.role}
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <FiMail className="text-indigo-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{profile.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FiPhone className="text-indigo-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{profile.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <h3 className="text-xl font-bold mb-4">Address</h3>
              <div className="flex items-start gap-3">
                <FiMapPin className="text-indigo-600 mt-1" />
                <div>
                  <p className="font-semibold">
                    {profile.address?.street || 'Not provided'}
                  </p>
                  <p className="text-gray-600">
                    {profile.address?.city || 'Not provided'}, {profile.address?.state || ''}
                  </p>
                  <p className="text-gray-600">
                    {profile.address?.zipcode || ''} {profile.address?.country || ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div>
                <h3 className="text-xl font-bold mb-4">Bio</h3>
                <p className="text-gray-700">{profile.bio}</p>
              </div>
            )}

            {/* Stats */}
            {profile.role === 'provider' && (
              <div className="bg-gray-50 rounded p-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold text-yellow-500">
                    {profile.rating.toFixed(1)} ⭐
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-indigo-600">{profile.totalReviews}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Edit Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="w-full border rounded px-4 py-2"
                rows="3"
              ></textarea>
            </div>

            {/* Address Fields */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Address</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  name="address_street"
                  value={formData.address.street || ''}
                  onChange={handleChange}
                  placeholder="Street"
                  className="w-full border rounded px-4 py-2"
                />
                <input
                  type="text"
                  name="address_city"
                  value={formData.address.city || ''}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full border rounded px-4 py-2"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="address_state"
                    value={formData.address.state || ''}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-full border rounded px-4 py-2"
                  />
                  <input
                    type="text"
                    name="address_zipcode"
                    value={formData.address.zipcode || ''}
                    onChange={handleChange}
                    placeholder="Zipcode"
                    className="w-full border rounded px-4 py-2"
                  />
                </div>
                <input
                  type="text"
                  name="address_country"
                  value={formData.address.country || ''}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full border rounded px-4 py-2"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded flex items-center gap-2 transition"
              >
                <FiSave /> Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="border border-gray-300 text-gray-700 font-bold px-6 py-2 rounded hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
