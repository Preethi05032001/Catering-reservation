// import React, { createContext, useState, useContext, useEffect } from 'react';

// // Create the Auth Context
// const AuthContext = createContext(null);

// // Create a provider component
// export const AuthProvider = ({ children }) => {
//   // State to hold the current user information
//   // Initialize from localStorage if available
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('currentUser');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });

//   // Effect to update localStorage whenever the user state changes
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem('currentUser', JSON.stringify(user));
//     } else {
//       localStorage.removeItem('currentUser');
//     }
//   }, [user]);

//   // Function to handle user login
//   const login = (userData) => {
//     // In a real app, you would verify credentials here
//     // For this example, we just set the user
//     setUser(userData);
//   };

//   // Function to handle user logout
//   const logout = () => {
//     setUser(null);
//   };

//   // Function to handle user registration
//   const register = (userData) => {
//     // In a real app, you would save to a database
//     // For this example, we add the new user to localStorage 'users' array
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const newUser = { ...userData, id: Date.now().toString() }; // Simple ID generation
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
//     // Optionally log in the user after registration
//     // login(newUser);
//     return newUser; // Return the newly registered user
//   };

//   // Provide the user state and login/logout functions to children components
//   return (
//     <AuthContext.Provider value={{ user, login, logout, register }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to easily access the Auth Context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import {
  getUsers,
  saveUsers,
  getCurrentUser,
  saveCurrentUser,
  removeCurrentUser,
} from "../utils/localStorageUtils"; // Import utility functions

// Create the Auth Context
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  // State to hold the current user information
  // Initialize from localStorage using the utility function
  const [user, setUser] = useState(() => getCurrentUser());

  // Effect to update localStorage whenever the user state changes
  useEffect(() => {
    if (user) {
      saveCurrentUser(user); // Save current user using utility
    } else {
      removeCurrentUser(); // Remove current user using utility
    }
  }, [user]);

  // Function to handle user login
  const login = (userData) => {
    // In a real app, you would verify credentials against a backend
    // For this localStorage example, verification happens before calling login
    setUser(userData);
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    toast.info("Logged out successfully!");
  };

  // Function to handle user registration
  const register = (userData) => {
    const users = getUsers(); // Get existing users using utility

    // Check if username already exists
    if (users.some((user) => user.username === userData.username)) {
      toast.error("Username already exists.");
      return null; // Indicate registration failed
    }

    const newUser = { ...userData, id: Date.now().toString() }; // Simple ID generation
    users.push(newUser);
    saveUsers(users); // Save updated users list using utility
    // toast.success('Registration successful! Please log in.'); // Toast handled in Register component
    return newUser; // Return the newly registered user
  };

  // Function to find a user by username and password
  const findUser = (username, password) => {
    const users = getUsers(); // Get existing users using utility
    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

  // Provide the user state and login/logout functions to children components
  return (
    <AuthContext.Provider value={{ user, login, logout, register, findUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily access the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
