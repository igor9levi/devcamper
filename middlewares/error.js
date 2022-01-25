const errorHandler = (err, req, res, next) => {
  // todo: test error handler, CRUD operations
  console.log(err.message); // TODO: use logger here

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server error!',
  });
};

module.exports = errorHandler;
