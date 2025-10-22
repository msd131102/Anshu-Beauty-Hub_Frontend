import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiPackage, FiSettings, FiHome, FiMail, FiShoppingBag, FiEdit, FiCamera } from 'react-icons/fi';

const UserDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [error, setError] = useState('');

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const { name, email } = userData;

  const handleEditToggle = () => {
    setUpdatedName(name || '');
    setUpdatedEmail(email || '');
    setIsEditing(!isEditing);
    setError('');
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.value);
  };

  const handleSaveProfile = async () => {
    if (!updatedName.trim() || !updatedEmail.trim()) {
      setError('Name and email are required.');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`https://anshu-beauty-hub-backend.onrender.com/api/user/profile/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedName,
          email: updatedEmail,
          profilePic: profilePic || '',
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage with new data
        localStorage.setItem('userData', JSON.stringify({
          ...userData,
          name: data.user.name,
          email: data.user.email,
          profilePic: data.user.profilePic,
        }));

        // Dispatch custom event to update auth state
        window.dispatchEvent(new Event('authStateChanged'));

        // Close edit mode and refresh page
        setIsEditing(false);
        window.location.reload();
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating your profile.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-700 hover:text-green-600">
                <FiHome className="h-5 w-5 mr-2" />
                Home
              </Link>
              <span className="ml-4 text-gray-500">|</span>
              <span className="ml-4 text-lg font-semibold text-gray-900">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/items" className="flex items-center text-gray-700 hover:text-green-600">
                <FiShoppingBag className="h-5 w-5 mr-2" />
                Shop
              </Link>
              <Link to="/contact" className="flex items-center text-gray-700 hover:text-green-600">
                <FiMail className="h-5 w-5 mr-2" />
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-8">
              <div className="flex items-center">
                {userData.profilePic ? (
                  <img
                    src={userData.profilePic}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover bg-white bg-opacity-20 p-1"
                  />
                ) : (
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    <FiUser className="h-8 w-8 text-white" />
                  </div>
                )}
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-white">Welcome back, {name || 'User'}!</h1>
                  <p className="text-green-100">{email || 'user@example.com'}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Dashboard Overview</h2>

              {/* Quick Actions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* My Orders */}
                <Link
                  to="/myorders"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-3">
                      <FiPackage className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">My Orders</h3>
                      <p className="text-gray-500">View your order history</p>
                    </div>
                  </div>
                </Link>

                {/* Shopping Cart */}
                <Link
                  to="/cart"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-3">
                      <FiShoppingCart className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Shopping Cart</h3>
                      <p className="text-gray-500">Continue shopping</p>
                    </div>
                  </div>
                </Link>

                {/* Account Settings */}
                <Link
                  to="/profile/edit"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 block"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="bg-purple-100 rounded-full p-3">
                        <FiSettings className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">Account Settings</h3>
                        <p className="text-gray-500">Manage your profile</p>
                      </div>
                    </div>
                    <FiEdit className="h-5 w-5 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Click to edit your profile</p>
                </Link>
              </div>

              {/* Recent Activity Placeholder */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-500">No recent activity to display.</p>
                  <Link
                    to="/items"
                    className="inline-flex items-center mt-2 text-green-600 hover:text-green-500"
                  >
                    Start shopping →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
