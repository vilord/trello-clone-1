const User = require('../models/user');
const isEmail = require('validator/lib/isEmail');

/**
 * Adds username to req.body using the email field
 * for Passport Local Authentication.
 */
module.exports = async (req, res, next) => {
  const { email } = req.body;
  if (!isEmail(email)) {
    const user = await User.findOne({ username: email }).catch(next);
    if (user) {
      req.body.email = user.email;
    }
  }
  next();
};
