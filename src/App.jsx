import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { DataProvider } from "./context/DataContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Register from "./components/Form/Register";
import Login from "./components/Form/Login";
import Profile from "./components/Profile/Profile";
import ProductList from "./components/ProductList/ProductList";
import Cart from "./components/Cart/Cart";
import MyOrders from "./components/Orders/MyOrders";
import UploadProduct from "./components/Product/UploadProduct";
import ViewOrders from "./components/Orders/Vieworders";
import { populateDefaultData } from "./utils/localStorageUtils";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toastify CSS
import "./index.css"; // Import global styles

// Component to apply theme class to body
const ThemeApplier = ({ children }) => {
  const { theme } = useTheme();
  useEffect(() => {
    // Ensure the class is correctly applied and removed
    const body = document.body;
    if (theme === "dark") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [theme]); // Rerun effect when theme changes
  return children;
};

function App() {
  // Populate default data when the app starts if localStorage is empty
  useEffect(() => {
    if (!localStorage.getItem("initialized")) {
      populateDefaultData();
      localStorage.setItem("initialized", "true");
    }
  }, []);

  return (
    // Wrap the entire app with necessary providers
    <ThemeProvider>
      {/* ThemeApplier should wrap everything that needs theme context */}
      <ThemeApplier>
        <AuthProvider>
          {/* DataProvider needs AuthProvider for user info */}
          <DataProvider>
            {/* CartProvider needs AuthProvider for user info */}
            <CartProvider>
              <Router>
                <Navbar /> {/* Navbar is outside Routes to be always visible */}
                <div className="container mx-auto p-4">
                  {" "}
                  {/* Basic container for content */}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} />
                    {/* Protected Routes based on role - Basic implementation */}
                    <Route path="/my-orders" element={<MyOrders />} />{" "}
                    {/* Customer */}
                    <Route
                      path="/upload-product"
                      element={<UploadProduct />}
                    />{" "}
                    {/* Caterer */}
                    <Route path="/view-orders" element={<ViewOrders />} />{" "}
                    {/* Caterer */}
                    {/* Add a fallback route for 404 */}
                    <Route path="*" element={<div>Page Not Found</div>} />
                  </Routes>
                </div>
                {/* ToastContainer for displaying notifications */}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </Router>
            </CartProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeApplier>
    </ThemeProvider>
  );
}

export default App;
