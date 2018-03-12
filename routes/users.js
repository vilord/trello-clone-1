const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/:id', function(req, res, next) {
  const userID = Number.parseFloat(req.params.id, 10);

  User.create({
    username: 'juandaco',
    id: userID,
    name: 'Juan D. Acosta',
  })
    .then(user => {
      console.log(user);

      res.send(`Successfuly added user with id: ${userID}`);
    })
    .catch(err => console.log(err));
});

module.exports = router;
