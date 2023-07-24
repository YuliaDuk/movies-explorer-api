const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getMovies, createMovie, deleteMovieById,
} = require('../controllers/movies');

const { REGEXP_URL } = require('../utils/constants');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(REGEXP_URL),
    trailerLink: Joi.string().required().pattern(REGEXP_URL),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(REGEXP_URL),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/movies/:mid', celebrate({
  params: Joi.object().keys({
    mid: Joi.string().required().length(24).hex(),
  }),
}), deleteMovieById);

module.exports = router;
