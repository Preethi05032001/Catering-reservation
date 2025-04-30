import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCart, saveCart } from "../utils/localStorageUtils"; // We will create this utility
import { toast } from "react-toastify";

// Create the Cart Context
const CartContext = createContext(null);

// Create a provider component
export const CartProvider = ({ children }) => {
  const { user } = useAuth(); // Get the current user from AuthContext
  // State to hold the cart items for the current user
  // Initialize from localStorage based on the user
  const [cart, setCart] = useState({});

  // Effect to load the cart when the user changes
  useEffect(() => {
    if (user) {
      setCart(getCart(user.id)); // Load cart for the logged-in user
    } else {
      setCart({}); // Clear cart if no user is logged in
    }
  }, [user]); // Rerun effect when user changes

  // Effect to save the cart whenever it changes (for the current user)
  useEffect(() => {
    if (user) {
      saveCart(user.id, cart); // Save cart for the logged-in user
    }
  }, [cart, user]); // Rerun effect when cart or user changes

  // Function to add an item to the cart
  const addToCart = (product) => {
    if (!user) {
      toast.warning("Please log in to add items to the cart."); // Use a simple alert for now, replace with a modal later
      return;
    }
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      const productId = product.id;
      if (newCart[productId]) {
        newCart[productId].quantity += 1;
      } else {
        newCart[productId] = { ...product, quantity: 1 };
      }
      return newCart;
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (productId) => {
    if (!user) return;
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId]) {
        newCart[productId].quantity -= 1;
        if (newCart[productId].quantity <= 0) {
          delete newCart[productId];
        }
      }
      return newCart;
    });
  };

  // Function to clear the entire cart
  const clearCart = () => {
    if (!user) return;
    setCart({});
  };

  // Calculate total price of items in the cart
  const cartTotal = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Provide the cart state and functions to children components
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to easily access the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
