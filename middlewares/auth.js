const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { MSG_ERR_AUTH } = require('../utils/constants');

const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError(MSG_ERR_AUTH));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new AuthorizationError(MSG_ERR_AUTH));
  }

  req.user = payload;

  return next();
};
