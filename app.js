require('dotenv').config();

const express = require('express');

const helmet = require('helmet');

const mongoose = require('mongoose');

const cors = require('cors');

const { celebrate, Joi } = require('celebrate');

const { errors } = require('celebrate');

const routes = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');

const rateLimiter = require('./middlewares/rateLimiter');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const { createUser, login } = require('./controllers/users');

const { REGEXP_EMAIL } = require('./utils/constants');

const app = express();

app.use(cors());

mongoose.connect(DB_URL)
  .then(() => {
    console.log('connected to db');
  });

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(rateLimiter);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(REGEXP_EMAIL),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(REGEXP_EMAIL),
    password: Joi.string().required().min(8),
  }),
}), login);
app.use(auth);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
