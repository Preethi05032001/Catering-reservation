import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useCart } from "../../context/CartContext"; // Import CartContext to show item count
import "./Navbar.css"; // Custom CSS for Navbar

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { cart } = useCart(); // Get cart state

  // Calculate total items in cart
  const totalCartItems = Object.values(cart).reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          🏠 Catering App
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          {/* Links visible to all (when not logged in) */}
          {!user && (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}

          {/* Links visible to Customers */}
          {user && user.role === "customer" && (
            <>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/cart">Cart ({totalCartItems})</Link>
              </li>{" "}
              {/* Show item count */}
              <li>
                <Link to="/my-orders">My Orders</Link>
              </li>
            </>
          )}

          {/* Links visible to Caterers */}
          {user && user.role === "caterer" && (
            <>
              <li>
                <Link to="/upload-product">Upload Product</Link>
              </li>
              <li>
                <Link to="/view-orders">View Orders</Link>
              </li>
            </>
          )}

          {/* Links visible when logged in (for both roles) */}
          {user && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logout} className="logout-button">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Dark/Light Mode Toggle */}
        <button onClick={toggleTheme} className="theme-toggle-button">
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
