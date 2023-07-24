const { MSG_ERR_ERRHANDLER } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? MSG_ERR_ERRHANDLER
        : message,
    });
  next();
};

module.exports = errorHandler;
