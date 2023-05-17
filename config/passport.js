const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
require('dotenv').config();

// Serialize user object
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user object
passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

// Configure Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (profile, done) => {
      try {
        // Check if user exists in the database
        const user = await User.findOne({ where: { username: profile.id } });
        
        if (user) {
          // User exists, return user object
          done(null, user);
        } else {
          // User doesn't exist, create new user
          const newUser = await User.create({
            fullName: profile.displayName,
            username: profile.id,
            password: '', // You can set a default or generate a random password
            city: ''
          });

          done(null, newUser);
        }
      } catch (err) {
        done(err, null);
      }
    }
  )
);
