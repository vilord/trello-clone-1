module.exports = function(req, res, next) {
  if (!req.isAuthenticated()) {
    const err = new Error('You need to login first');
    err.status = 401;
    return res.status(401).json({
      error: err.message,
    });
  }
  next();
};
