const express = require('express');
const router = express.Router();
const Board = require('../models/board');
const User = require('../models/user');
const verifyUser = require('../middleware/verifyUser');
const hashids = require('../config/hashids');

router.get('/:id', async (req, res, next) => {
  const id = hashids.decodeHex(req.params.id);

  try {
    const board = await Board.findById(id);
    if (!board) {
      const err = new Error('Board not found');
      err.status = 404;
      return next(err);
    }

    res.json({
      board,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', verifyUser, async (req, res, next) => {
  const { title } = req.body;

  // TODO: if sent with a team, assing all members to the new board.
  try {
    const board = await Board.create({
      title,
      // Asigns the user in session as an admin
      members: [
        {
          _id: req.user._id,
          admin: true,
        },
      ],
    });

    await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { boards: { board: board._id } } },
      {
        runValidators: true,
        new: true,
      },
    );

    res.json(board);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
