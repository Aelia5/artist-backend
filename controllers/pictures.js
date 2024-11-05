const Picture = require('../models/picture');
const Section = require('../models/section');
const Series = require('../models/series');

// const ValidationError = require('../errors/validation-err');
// const NotFoundError = require('../errors/not-found-err');

// const { validationErrorMessage } = require('../utils/constants');

const { SUCCESS_CODE } = require('../utils/constants');
// const UnauthorizedError = require('../errors/unauthorized-err');
const DefaultError = require('../errors/default-err');

// const { NODE_ENV, ADMIN_EMAIL } = process.env;
// const { checkAvailability } = require('../middlewares/check');

// const notFoundMessage = 'Такого дома не существует';
// const forbiddenMessage = 'Вы не можете редактировать или удалять чужой дом';

module.exports.createSeries = (req, res, next) => {
  const series = req.body;
  Series.create(series)
    .then((seriesData) => res.status(SUCCESS_CODE).send(seriesData))
    .catch(() => {
      next(new DefaultError('При добавлении серии произошла ошибка'));
    });
};

module.exports.createPicture = (req, res, next) => {
  const picture = req.body;
  Picture.create(picture)
    .then((pictureData) => res.status(SUCCESS_CODE).send(pictureData))
    .catch(() => {
      next(new DefaultError('При добавлении картины произошла ошибка'));
    });
};

module.exports.getAllData = (req, res, next) => {
  const data = {};
  Picture.find({})
    .then((pictures) => {
      data.pictures = pictures;
    })
    .then(() => Section.find({}))
    .then((sections) => {
      data.sections = sections;
    })
    .then(() => Series.find({}))
    .then((series) => {
      data.series = series;
    })
    .then(() => res.send(data))
    .catch((err) => {
      next(err);
    });
};
