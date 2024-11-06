const Series = require('../models/series');
const { SUCCESS_CODE } = require('../utils/constants');
const DefaultError = require('../errors/default-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.createSeries = (req, res, next) => {
  const series = req.body;
  Series.create(series)
    .then((seriesData) => res.status(SUCCESS_CODE).send(seriesData))
    .catch(() => {
      next(new DefaultError('При добавлении серии произошла ошибка'));
    });
};

module.exports.editSeries = (req, res, next) => {
  Series.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true, runValidators: true }
  )
    .then((seriesData) => {
      if (!seriesData) {
        next(new NotFoundError('Серия не найдена'));
      } else {
        res.send(seriesData);
      }
    })
    .catch(() => {
      next(new DefaultError('При редактировании серии произошла ошибка'));
    });
};

module.exports.deleteSeries = (req, res, next) => {
  Series.findByIdAndDelete(req.params.id)
    .then((seriesData) => {
      if (!seriesData) {
        next(new NotFoundError('Серия не найдена'));
      } else {
        res.send(seriesData);
      }
    })
    .catch(() =>
      next(new DefaultError('При удалении раздела произошла ошибка'))
    );
};
