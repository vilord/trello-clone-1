const path = require('path');
const express = require('express');
const auth = express.Router();
const passportLocal = require('../auth/local');
const passportGoogle = require('../auth/google');
const User = require('../models/user');
const verifyUser = require('../middleware/verifyUser');

/*
  Local Strategy
*/
auth.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const err = new Error(
      'You must provide a username and password to sign up',
    );
    err.status = 401;
    next(err);
  }

  try {
    if (await User.findOne({ username })) {
      const err = new Error('username already exists.');
      err.status = 401;
      return next(err);
    }

    let newUser = new User({
      username,
      password,
    });

    const user = await newUser.save();

    req.login(user, function(err) {
      if (err) throw err;
      // TODO: Start user session.

      res.json({
        user,
        message: 'username correctly created.',
      });
    });
  } catch (err) {
    return next(err);
  }
});

auth.post(
  '/login',
  passportLocal.authenticate('local', {
    failureFlash: true,
    successFlash: true,
  }),
  function(req, res) {
    res.json({
      message: 'User logged in.',
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
  passportGoogle.authenticate('google', { scope: ['profile'] }),
);

auth.get('/google/callback', passportGoogle.authenticate('google'), function(
  req,
  res,
) {
  if (req.user) {
    const popUpCloser = path.resolve('../auth/popup-closer.html');
    res.sendFile(popUpCloser);
  } else {
    res.json({
      message: 'Not users found',
    });
  }
});

/**
 * ALL
 */
auth.get('/user-session', verifyUser, function(req, res) {
  // TODO: set user session.

  // User.findById(
  //   { _id: req.user._id },
  //   {
  //     _id: false,
  //     __v: false,
  //     updatedAt: false,
  //     createdAt: false,
  //     password: false,
  //   },
  //   function(err, user) {
  //     if (err) throw err;
  //     res.json({
  //       user,
  //     });
  //   },
  // );

  res.json({
    message: 'User authenticated',
  });
});

module.exports = auth;
