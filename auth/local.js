const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const passportUserSetup = require('./passportUserSetup');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        const valid = await user.verifyPassword(password);

        if (!user || !valid) {
          return done(null, false, {
            message: 'Incorrect username or password.',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

// serialize user into the session
passportUserSetup();

module.exports = passport;
