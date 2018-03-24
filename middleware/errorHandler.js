module.exports = function(err, req, res, next) {
  if (process.env.NODE_ENV === 'development') {
    console.log(err.stack);
  }

  if (err.name === 'ValidationError') {
    err.status = 400;
  }

  if (err.name === 'BulkWriteError' && err.code === 11000) {
    // Trying to write a duplicate unique key. (username, email)
    err.status = 409;
    const dupVal = err.message.substring(
      err.message.indexOf('"') + 1,
      err.message.lastIndexOf('"'),
    );

    err.message = `Can't create record with duplicate: ${dupVal}`;
  }

  res.status(err.status || 500).json({
    error: err.message,
  });
};
