const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const {
  STATUS_CREATE,
  MSG_ERR_DUPLICATE,
  MSG_ERR_NECESSARYDATA,
  MSG_ERR_NOTFOUND,
  MSG_ERR_INVALIDID,
} = require('../utils/constants');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const DuplicateError = require('../errors/DuplicateError');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      const newUser = user.toObject();
      delete newUser.password;
      res.status(STATUS_CREATE).send({ data: newUser });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(MSG_ERR_NECESSARYDATA));
      }
      if (err.code === 11000) {
        return next(new DuplicateError(MSG_ERR_DUPLICATE));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const getMyInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MSG_ERR_NOTFOUND);
      }
      res.send({ data: user });
    })
    .catch(next);
};

const updateMyInfo = (req, res, next) => {
  const { email, name } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { email, name },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MSG_ERR_NOTFOUND);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(MSG_ERR_INVALIDID));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  login,
  getMyInfo,
  updateMyInfo,
};
