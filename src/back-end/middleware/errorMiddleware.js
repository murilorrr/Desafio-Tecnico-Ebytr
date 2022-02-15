const errorMiddleware = (err, req, res, next) => {
  if (err.code) {
    return res.status(err.code).json(err);
  }

  return (
    res.status(500).json({ message: 'Internal Server Error' }) || next(err)
  );
};

module.exports = errorMiddleware;
