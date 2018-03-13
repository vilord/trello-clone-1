const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { name, username } = req.query;

  try {
    const user = await User.createUser(name, username);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
