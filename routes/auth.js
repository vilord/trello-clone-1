const express = require('express');
const auth = express.Router();
const passportLocal = require('../auth/local');
const passportGoogle = require('../auth/google');
const User = require('../models/user');
const verifyUser = require('../middleware/verifyUser');
const addLoginUsername = require('../middleware/addLoginUsername');

/**
 * Local Strategy
 */
auth.post('/signup', async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    // Login the user
    req.login(user, function(err) {
      if (err) throw err;
      res.json({
        user,
      });
    });
  } catch (err) {
    next(err);
  }
});

auth.post(
  '/login',
  addLoginUsername,
  passportLocal.authenticate('local'),
  (req, res) => {
    res.json({
      user: req.user,
    });
  },
);

auth.post('/logout', verifyUser, function(req, res) {
  req.logout();
  req.session.destroy();
  res.json({
    message: 'User logged out',
  });
});

/**
 * Google OAuth2 Strategy.
 */
auth.get(
  '/google',
  passportGoogle.authenticate('google', { scope: ['profile', 'email'] }),
);

const hostURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
auth.get(
  '/google/callback',
  passportGoogle.authenticate('google', {
    successRedirect: hostURL + '/',
    failureRedirect: '/login',
  }),
);

/**
 * ALL
 */
auth.get('/user-session', verifyUser, async (req, res, next) => {
  res.json({
    user: req.user,
  });
});

module.exports = auth;
