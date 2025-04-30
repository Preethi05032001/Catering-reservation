import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AuthForms.css"; // Custom CSS for forms

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, findUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!username || !password) {
      toast.warning("Please enter username and password.");
      return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem("cateringUsers") || "[]");

    // Find the user
    // const foundUser = users.find(
    //   (user) => user.username === username && user.password === password
    // );
    const foundUser = findUser(username, password);

    if (foundUser) {
      login(foundUser); // Log in the user using the context
      toast.success("Login successful!"); // Use alert for now
      // Redirect based on role
      if (foundUser.role === "customer") {
        navigate("/products"); // Redirect customers to product list
      } else if (foundUser.role === "caterer") {
        navigate("/upload-product"); // Redirect caterers to upload page
      } else {
        navigate("/"); // Default redirect
      }
    } else {
      toast.error("Invalid username or password."); // Use alert for now
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
