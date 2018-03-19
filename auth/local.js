const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passportUserSetup = require('./passportUserSetup');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user || (await !user.verifyPassword(password))) {
        return done(null, false, {
          message: 'Incorrect username or password.',
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// serialize user into the session
passportUserSetup();

module.exports = passport;
