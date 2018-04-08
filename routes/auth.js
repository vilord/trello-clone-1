const express = require('express');
const auth = express.Router();
const User = require('../models/user');
const passportLocal = require('../auth/local');
const passportGoogle = require('../auth/google');
const verifyUser = require('../middleware/verifyUser');
const addLoginEmail = require('../middleware/addLoginEmail');

/**
 * Local Strategy
 */
auth.post(
  '/login',
  addLoginEmail,
  passportLocal.authenticate('local'),
  async (req, res) => {
    const user = await User.findById(req.user._id).populate();
    res.json({
      user,
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
  try {
    const user = await User.findById({ _id: req.user._id }).populate(
      'boards.board',
      'title theme',
    );

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = auth;
