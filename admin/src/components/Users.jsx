import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUser, FiMail, FiCalendar, FiLock, FiTrash2 } from 'react-icons/fi';
import { ordersPageStyles as styles } from '../assets/adminStyles';

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const { data } = await axios.get('https://anshu-beauty-hub-backend.onrender.com/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChangePassword = (email) => {
    navigate(`/admin/change-password?email=${encodeURIComponent(email)}`);
  };

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`https://anshu-beauty-hub-backend.onrender.com/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('User deleted successfully!');
        fetchUsers(); // Refresh the user list
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(error.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term))
    }

    setFilteredUsers(result);
  }, [users, searchTerm]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.innerContainer}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>User Management</h1>
          <p className={styles.headerSubtitle}>
            View and manage registered users
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statsCard('border-blue-500')}>
            <div className={styles.statsCardInner}>
              <div className={styles.statsCardIconContainer('bg-blue-100')}>
                <FiUser className={styles.statsCardIcon('text-blue-600')} />
              </div>
              <div>
                <p className={styles.statsCardLabel}>Total Users</p>
                <p className={styles.statsCardValue}>{users.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className={styles.contentContainer}>
          <div className="overflow-x-auto">
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeaderCell}>Name</th>
                  <th className={styles.tableHeaderCell}>Email</th>
                  <th className={styles.tableHeaderCell}>Joined Date</th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className={styles.emptyStateCell}>
                      <div className={styles.emptyStateContainer}>
                        <FiUser className={styles.emptyStateIcon} />
                        <h3 className={styles.emptyStateTitle}>No users found</h3>
                        <p className={styles.emptyStateText}>Try changing your search</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user._id} className={styles.tableRowHover}>
                      <td className={styles.tableDataCell}>
                        <div className="font-medium">{user.name}</div>
                      </td>
                      <td className={styles.tableDataCell}>
                        <div className="flex items-center">
                          <FiMail className="mr-2 text-gray-500" />
                          {user.email}
                        </div>
                      </td>
                      <td className={`${styles.tableDataCell} text-sm text-gray-500`}>
                        <div className="flex items-center">
                          <FiCalendar className="mr-2 text-gray-500" />
                          {(() => {
                            const date = new Date(user.createdAt);
                            return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                          })()}
                        </div>
                      </td>
                      <td className={styles.tableDataCell}>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleChangePassword(user.email)}
                            className="text-emerald-600 hover:text-emerald-900 flex items-center"
                          >
                            <FiLock className="mr-1" size={14} />
                            Change Password
                          </button>
                          {user.email !== 'admin@gmail.com' && (
                            <button
                              onClick={() => handleDeleteUser(user._id, user.name)}
                              className="text-red-600 hover:text-red-900 flex items-center"
                            >
                              <FiTrash2 className="mr-1" size={14} />
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
