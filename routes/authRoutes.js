// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const { googleCallback, logout } = require('../controllers/authController');

const router = express.Router();

// Google OAuth callback
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleCallback
);

// Logout user
router.post('/logout', logout);

module.exports = router;
