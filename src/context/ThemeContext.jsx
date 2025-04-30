import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Theme Context
const ThemeContext = createContext(null);

// Create a provider component
export const ThemeProvider = ({ children }) => {
  // State to hold the current theme ('light' or 'dark')
  // Initialize from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  // Effect to apply the theme class to the body element
  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Rerun effect when theme changes

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Provide the theme state and toggle function to children components
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily access the Theme Context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
