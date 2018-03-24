require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const passportUserSetup = require('./passportUserSetup');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;

      const updates = {
        name: profile.displayName,
        google_id: profile.id,
        email,
        avatar: profile.photos[0].value,
      };

      const options = {
        upsert: true,
        setDefaultsOnInsert: true,
      };

      User.findOneAndUpdate({ email }, updates, options, (err, user) =>
        done(err, user),
      );
    },
  ),
);

// serialize user into the session
passportUserSetup();

module.exports = passport;
