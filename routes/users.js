const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.listUsers()
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/', async (req, res, next) => {
  const { email, username } = req.query;

  try {
    const user = await User.createUser(email, username);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
