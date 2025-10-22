import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUpload, FiX, FiSave, FiArrowLeft } from "react-icons/fi";
import { addItemPageStyles as styles } from "../assets/adminStyles";

const initialFormState = {
  name: "",
  description: "",
  category: "",
  oldPrice: "",
  price: "",
  image: null,
  preview: "",
  imageUrl: "",
};

const categories = [
  "Haircare",
  "Skincare",
  "Bodycare",
  "Lip & Bath",
];

export default function EditItemPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`https://anshu-beauty-hub-backend.onrender.com/api/items`);
      const product = data.find(p => p._id === id);
      if (!product) {
        alert('Product not found');
        navigate('/admin/list-items');
        return;
      }
      setFormData({
        name: product.name,
        description: product.description || "",
        category: product.category,
        oldPrice: product.oldPrice.toString(),
        price: product.price.toString(),
        image: null,
        preview: product.imageUrl ? `https://anshu-beauty-hub-backend.onrender.com${product.imageUrl}` : "",
        imageUrl: product.imageUrl || "",
      });
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to load product');
      navigate('/admin/list-items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((f) => ({
      ...f,
      image: file,
      preview: URL.createObjectURL(file),
      imageUrl: "", // Clear old URL if new image
    }));
  };

  const removeImage = () => {
    setFormData((f) => ({ ...f, image: null, preview: "", imageUrl: "" }));
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("description", formData.description);
      body.append("category", formData.category);
      body.append("oldPrice", formData.oldPrice);
      body.append("price", formData.price);
      if (formData.image) {
        body.append("image", formData.image);
      } else {
        body.append("imageUrl", formData.imageUrl);
      }

      await axios.put(`https://anshu-beauty-hub-backend.onrender.com/api/items/${id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated!");
      navigate('/admin/list-items');
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.innerContainer}>
          <div className="text-center py-8">Loading...</div>
        </div>
      </div>
    );
  }

  const { name, description, category, oldPrice, price, preview } = formData;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.innerContainer}>
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/admin/list-items')}
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <FiArrowLeft className="mr-2" />
            Back to Products
          </button>
          <h1 className={styles.heading}>Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Name & Category */}
          <div className={styles.gridContainer}>
            <div>
              <label className={styles.label}>Product Name *</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label}>Category *</label>
              <select
                name="category"
                value={category}
                onChange={handleChange}
                required
                className={styles.input}
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
              rows="3"
              className={styles.textarea}
            />
          </div>

          {/* Prices */}
          <div className={styles.priceGrid}>
            <div>
              <label className={styles.label}>Original Price (₹) *</label>
              <input
                type="number"
                name="oldPrice"
                value={oldPrice}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label}>Selling Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className={styles.label}>Product Image</label>
            <div
              onClick={() => fileInputRef.current.click()}
              className={styles.imageUploadContainer}
            >
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className={styles.removeButton}
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <FiUpload className={styles.uploadIcon} />
                  <p className={styles.uploadText}>
                    Click to upload new image (optional)
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className={styles.hiddenInput}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            <FiSave className="mr-2" />
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}
