const express = require('express');
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123',
};

// Admin login route
router.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  // Validate credentials
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Send a success response with login status
    return res.status(200).json({ message: 'Login successful', isLoggedIn: true });
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Admin logout route
router.post('/api/admin/logout', (req, res) => {
  // Clear any session or token if applicable
  return res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
