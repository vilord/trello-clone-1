const express = require('express');
const router = express.Router();
const User = require('../models/user');
const verifyUser = require('../middleware/verifyUser');

/**
 * User Signup
 */
router.post('/', async (req, res, next) => {
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

/**
 * Update User's profile
 */
router.put('/profile', verifyUser, async (req, res, next) => {
  const update = { ...req.body.profile };

  try {
    // TODO: verify email before allowing modification.
    const user = await User.findByIdAndUpdate(req.user._id, update, {
      runValidators: true,
      new: true,
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
