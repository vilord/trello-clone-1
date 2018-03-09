const express = require('express');
const router = express.Router();

router.get('/:id', function(req, res, next) {
  console.log(req.params.id);
  res.send('Some posts.');
});

module.exports = router;
