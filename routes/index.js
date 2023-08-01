const router = require('express').Router();

const userRoutes = require('./users');

const moviesRoutes = require('./movies');

const NotFoundError = require('../errors/NotFoundError');

router.use(userRoutes);
router.use(moviesRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Такая страница не существует'));
});

module.exports = router;
