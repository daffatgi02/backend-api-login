const User = require('../models/user');
const passport = require('passport');

// Controller for Google OAuth callback
const googleCallback = (req, res) => {
  passport.authenticate('google', (err, user) => {
    if (err) {
      // Handle error
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      // User authentication failed
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // User authentication succeeded, generate session
    req.logIn(user, (err) => {
      if (err) {
        // Handle error
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Redirect or send response as desired
      return res.status(200).json({ message: 'Login successful' });
    });
  })(req, res);
};

// Controller for logging out user
const logout = (req, res) => {
  req.logOut();
  res.status(200).json({ message: 'Logout successful' });
};

module.exports = { googleCallback, logout };
