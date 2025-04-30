import React from "react";
import { useCart } from "../../context/CartContext";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Cart.css"; // Custom CSS for Cart

function Cart() {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();
  const { placeOrder } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated as a customer
  if (!user || user.role !== "customer") {
    return <Navigate to="/login" />;
  }

  const handlePlaceOrder = () => {
    if (Object.keys(cart).length === 0) {
      toast.warning("Your cart is empty.");
      return;
    }
    placeOrder(cart); // Place the order using DataContext
    clearCart(); // Clear the cart after placing the order
    toast.success("Order placed successfully!"); // Use alert for now
    navigate("/my-orders"); // Redirect to the customer's order history
  };

  const cartItemsArray = Object.values(cart); // Convert cart object to array for mapping

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>
      {cartItemsArray.length === 0 ? (
        <h2 className="noCart-items">Your cart is empty.</h2>
      ) : (
        <div className="cart-items-list">
          {cartItemsArray.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">₹{item.price.toFixed(2)}</p>
                <p className="cart-item-quantity">Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-from-cart-button"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-summary">
            <p className="cart-total">Total: ₹{cartTotal.toFixed(2)}</p>
            <button onClick={handlePlaceOrder} className="place-order-button">
              Place Order
            </button>
            <button onClick={clearCart} className="clear-cart-button">
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
