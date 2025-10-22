import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiArrowLeft, FiCamera, FiSave, FiX } from 'react-icons/fi';

const ProfileEdit = () => {
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const { name, email, profilePic: currentProfilePic } = userData;

  useEffect(() => {
    // Initialize form with current user data
    setUpdatedName(name || '');
    setUpdatedEmail(email || '');
    setProfilePic(currentProfilePic || '');
  }, [name, email, currentProfilePic]);

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.value);
  };

  const handleSaveProfile = async () => {
    if (!updatedName.trim()) {
      setError('Name is required.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

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

        setSuccess('Profile updated successfully!');

        // Redirect to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating your profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-green-600">
                <FiArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Link>
              <span className="ml-4 text-gray-500">|</span>
              <span className="ml-4 text-lg font-semibold text-gray-900">Edit Profile</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-8">
              <div className="flex items-center">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover bg-white bg-opacity-20 p-1"
                  />
                ) : (
                  <div className="bg-white bg-opacity-20 rounded-full p-4">
                    <FiUser className="h-12 w-12 text-white" />
                  </div>
                )}
                <div className="ml-6">
                  <h1 className="text-2xl font-bold text-white">Edit Your Profile</h1>
                  <p className="text-green-100">Update your personal information</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="px-6 py-8">
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-green-600 text-sm">{success}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Profile Picture URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiCamera className="mr-2" />
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    value={profilePic}
                    onChange={handleProfilePicChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  />
                  {profilePic && (
                    <div className="mt-3">
                      <img src={profilePic} alt="Profile preview" className="w-20 h-20 rounded-full object-cover border-2 border-gray-200" />
                    </div>
                  )}
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input (Read-only for security) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={updatedEmail}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                    placeholder="Enter your email address"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email address cannot be changed for security reasons.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <Link
                    to="/dashboard"
                    className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-400 transition-colors flex items-center justify-center"
                  >
                    <FiX className="mr-2" />
                    Cancel
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

export default ProfileEdit;
