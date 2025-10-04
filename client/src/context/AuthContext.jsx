import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

// 1. Create the context
export const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);

  useEffect(() => {
    // This effect runs when the app loads to check for an existing token
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser({
          id: decodedUser.id,
          name: decodedUser.name, // Make sure this exists
          // ...other fields
        });
      } catch (error) {
        // If token is invalid, clear it
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const decodedUser = jwtDecode(newToken);
    setUser({
      id: decodedUser.id,
      name: decodedUser.name, // Make sure this exists
      // ...other fields
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // 3. The value provided to consuming components
  const value = { user, token, login, logout, isAuthenticated: !!token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};