import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./Forms.css"; // Custom CSS for general forms
import { toast } from "react-toastify";

function UploadProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // For placeholder image URL
  const { addProduct } = useData();
  const { user } = useAuth();

  // Redirect to login if not authenticated as a caterer
  if (!user || user.role !== "caterer") {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!name || !description || !price || !imageUrl) {
      toast.warning("Please fill in all fields.");
      return;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    const newProduct = {
      name,
      description,
      price: parseFloat(price), // Convert price to number
      imageUrl,
      // catererId will be added in DataContext's addProduct function
    };

    addProduct(newProduct); // Add product using DataContext
    toast.success("Product uploaded successfully!"); // Use alert for now
    // Clear the form
    setName("");
    setDescription("");
    setPrice("");
    setImageUrl("");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Upload New Product</h2>
      <form onSubmit={handleSubmit} className="app-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (₹):</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="e.g., https://placehold.co/300x200/..."
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default UploadProduct;
