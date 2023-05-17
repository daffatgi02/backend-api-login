const User = require('../models/user');

// Controller for getting user profile
const getUserProfile = (req, res) => {
  // Check if user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // User is authenticated, fetch user data from database
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Return user profile
      return res.status(200).json(user);
    })
    .catch((err) => {
      // Handle error
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    });
};

module.exports = { getUserProfile };
