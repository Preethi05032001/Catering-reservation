import React from 'react';
import { useData } from '../../context/DataContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './ProductList.css'; // Custom CSS for ProductList

function ProductList() {
  const { products } = useData();
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Redirect to login if not authenticated as a customer
  // Or redirect caterers away from this page
  if (!user || user.role !== 'customer') {
     // You could redirect caterers to their dashboard or show a message
     // For now, let's redirect non-customers to home or login
     if (user && user.role === 'caterer') {
         return <Navigate to="/upload-product" />; // Redirect caterers
     }
    return <Navigate to="/login" />; // Redirect non-logged-in users
  }


  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Available Catering Options</h2>
      <div className="product-grid">
        {products?.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price.toFixed(2)}</p> {/* Format price */}
              <button onClick={() => addToCart(product)} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && <p>No products available at the moment.</p>}
    </div>
  );
}

export default ProductList;
