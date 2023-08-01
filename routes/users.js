const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();

const { REGEXP_EMAIL } = require('../utils/constants');

const {
  getMyInfo, updateMyInfo,
} = require('../controllers/users');

router.get('/users/me', getMyInfo);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().pattern(REGEXP_EMAIL),
  }),
}), updateMyInfo);

module.exports = router;
