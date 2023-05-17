// app.js
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/sequelize');

const app = express();

// Configure passport
require('./config/passport');

// Middleware for parsing JSON body
app.use(express.json());

// Middleware for session management
app.use(
  session({
    secret: '3I9X2J7N4F6D8A1C5B0E',
    resave: false,
    saveUninitialized: false
  })
);

// Initialize passport and session
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Sync the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });
