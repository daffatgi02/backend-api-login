// routes/userRoutes.js
const express = require('express');
const { getUserProfile } = require('../controllers/userController');

const router = express.Router();

// Get user profile
router.get('/profile', getUserProfile);

module.exports = router;
