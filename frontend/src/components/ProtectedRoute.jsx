import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn'); // Read from localStorage

  if (!isAdminLoggedIn) {
    // Redirect to the admin login page if not logged in
    return <Navigate to="/admin-login" />;
  }

  // Render children (protected component) if logged in
  return children;
};

export default ProtectedRoute;
