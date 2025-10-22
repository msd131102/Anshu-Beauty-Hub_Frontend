import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEdit, FiTrash2, FiPackage, FiImage } from 'react-icons/fi';
import { ordersPageStyles as styles } from '../assets/adminStyles';

const ListItemsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('https://anshu-beauty-hub-backend.onrender.com/api/items');
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-item/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`https://anshu-beauty-hub-backend.onrender.com/api/items/${id}`);
      setProducts(products.filter(p => p._id !== id));
      setFilteredProducts(filteredProducts.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term))
    }

    setFilteredProducts(result);
  }, [products, searchTerm]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.innerContainer}>
        {/* Header */}
        <div className={styles.headerContainer}>
          <h1 className={styles.headerTitle}>Product Management</h1>
          <p className={styles.headerSubtitle}>
            View and manage all products
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products by name or category..."
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
                <FiPackage className={styles.statsCardIcon('text-blue-600')} />
              </div>
              <div>
                <p className={styles.statsCardLabel}>Total Products</p>
                <p className={styles.statsCardValue}>{products.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className={styles.contentContainer}>
          <div className="overflow-x-auto">
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeaderCell}>Image</th>
                  <th className={styles.tableHeaderCell}>Name</th>
                  <th className={styles.tableHeaderCell}>Category</th>
                  <th className={styles.tableHeaderCell}>Price</th>
                  <th className={styles.tableHeaderCell}>Actions</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className={styles.emptyStateCell}>
                      <div className={styles.emptyStateContainer}>
                        <FiPackage className={styles.emptyStateIcon} />
                        <h3 className={styles.emptyStateTitle}>No products found</h3>
                        <p className={styles.emptyStateText}>
                          {products.length === 0 ? (
                            <>
                              No products added yet. <a href="/admin/add-item" className="text-emerald-600 hover:text-emerald-900 underline">Add your first product</a>
                            </>
                          ) : (
                            'Try changing your search'
                          )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(product => (
                    <tr key={product._id} className={styles.tableRowHover}>
                      <td className={styles.tableDataCell}>
                        <div className="flex items-center">
                          {product.imageUrl ? (
                            <img
                              src={`https://anshu-beauty-hub-backend.onrender.com${product.imageUrl}`}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <FiImage className="w-12 h-12 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className={styles.tableDataCell}>
                        <div className="font-medium">{product.name}</div>
                      </td>
                      <td className={styles.tableDataCell}>
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                          {product.category}
                        </span>
                      </td>
                      <td className={styles.tableDataCell}>
                        <div className="text-sm">
                          <div className="font-medium">₹{product.price}</div>
                          {product.oldPrice > product.price && (
                            <div className="text-gray-500 line-through">₹{product.oldPrice}</div>
                          )}
                        </div>
                      </td>
                      <td className={styles.tableDataCell}>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(product._id)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FiEdit className="mr-1" size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <FiTrash2 className="mr-1" size={14} />
                            Delete
                          </button>
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

export default ListItemsPage;
