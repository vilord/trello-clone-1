const User = require('../models/user');

/**
 * Adds username to req.body using the email field
 * for Passport Local authentication.
 */
module.exports = async (req, res, next) => {
  const { email } = req.body;
  if (email) {
    const user = await User.findOne({ email }).catch(next);
    if (user) {
      req.body.username = user.username;
    }
  }
  next();
};
