import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getUsers,
  getProducts,
  saveProducts,
  getOrders,
  saveOrders,
} from "../utils/localStorageUtils"; // We will create this utility
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

// Create the Data Context
const DataContext = createContext(null);

// Create a provider component
export const DataProvider = ({ children }) => {
  const { user } = useAuth(); // Get current user to filter data if needed

  // State for products
  const [products, setProducts] = useState([]);
  // State for orders
  const [orders, setOrders] = useState([]);
  // State for all users (primarily for admin/caterer views if needed)
  const [users, setUsers] = useState([]);

  // Effect to load initial data from localStorage
  useEffect(() => {
    setUsers(getUsers());
    setProducts(getProducts());
    setOrders(getOrders());
  }, []); // Run once on mount

  // Effect to save products and orders when they change
  useEffect(() => {
    saveProducts(products);
  }, [products]);

  useEffect(() => {
    saveOrders(orders);
  }, [orders]);

  // Function to add a new product (used by Caterers)
  const addProduct = (productData) => {
    if (!user || user.role !== "caterer") {
      toast.warning("Only caterers can add products."); // Replace with better UI
      return;
    }
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
      catererId: user.id,
    }; // Add ID and catererId
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    return newProduct;
  };

  // Function to place an order (used by Customers)
  const placeOrder = (cartItems) => {
    if (!user || user.role !== "customer") {
      toast.warning("Only customers can place orders."); // Replace with better UI
      return;
    }
    if (Object.keys(cartItems).length === 0) {
      toast.warning("Your cart is empty."); // Replace with better UI
      return;
    }

    const orderId = Date.now().toString();
    const newOrder = {
      id: orderId,
      customerId: user.id,
      date: new Date().toISOString(),
      items: Object.values(cartItems).map((item) => ({
        // Map cart item structure to order item structure
        productId: item.id,
        productName: item.name, // Store name for easier display
        quantity: item.quantity,
        price: item.price,
        catererId: item.catererId, // Store catererId for caterer view
      })),
      total: Object.values(cartItems).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      status: "Pending", // Initial status
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    // In a real app, you would clear the cart *after* successful order processing
    // For this example, we'll handle cart clearing in the component that calls placeOrder
    return newOrder;
  };

  // Get products filtered by caterer (for Caterer's view)
  const getProductsByCaterer = (catererId) => {
    return products.filter((product) => product.catererId === catererId);
  };

  // Get orders placed by a specific customer (for Customer's 'My Orders' view)
  const getOrdersByCustomer = (customerId) => {
    return orders.filter((order) => order.customerId === customerId);
  };

  // Get orders containing products from a specific caterer (for Caterer's 'View Orders' view)
  const getOrdersForCaterer = (catererId) => {
    // Filter orders where *any* item in the order belongs to this caterer
    return orders.filter((order) =>
      order.items.some((item) => item.catererId === catererId)
    );
  };

  // Provide the data states and functions to children components
  return (
    <DataContext.Provider
      value={{
        products,
        orders,
        users,
        addProduct,
        placeOrder,
        getProductsByCaterer,
        getOrdersByCustomer,
        getOrdersForCaterer,
        setProducts, // Allow updating products state directly if needed (e.g., for default data)
        setUsers, // Allow updating users state directly if needed (e.g., for default data)
        setOrders, // Allow updating orders state directly if needed (e.g., for default data)
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to easily access the Data Context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
