const express = require('express');
const router = express.Router();
const Board = require('../models/board');

router.get('/', (req, res, next) => {
  Board.find({})
    .then(data => res.json(data))
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {});

module.exports = router;
