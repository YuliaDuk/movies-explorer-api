const Movie = require('../models/movie');

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const {
  STATUS_OK,
  MSG_ERR_INVALIDID,
  MSG_ERR_NECESSARYDATA,
  MSG_ERR_NOTFOUND_MOVIE,
  MSG_ERR_FORBIDDEN,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  Movie
    .find({ owner: req.user._id })
    .then((movie) => res.send({ data: movie }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    })
    .then((movie) => res.status(STATUS_OK).send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError(MSG_ERR_NECESSARYDATA));
      }
      return next(err);
    });
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.mid)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MSG_ERR_NOTFOUND_MOVIE);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(MSG_ERR_FORBIDDEN);
      }
      Movie
        .findByIdAndRemove(req.params.mid)
        .then((delmovie) => res.status(STATUS_OK).send({ data: delmovie }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError(MSG_ERR_INVALIDID));
      }
      return next(err);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
