const Section = require('../models/section');
const { SUCCESS_CODE } = require('../utils/constants');
const DefaultError = require('../errors/default-err');
const NotFoundError = require('../errors/not-found-err');

module.exports.createSection = (req, res, next) => {
  const section = req.body;
  Section.create(section)
    .then((sectionData) => res.status(SUCCESS_CODE).send(sectionData))
    .catch(() => {
      next(new DefaultError('При добавлении раздела произошла ошибка'));
    });
};

module.exports.editSection = (req, res, next) => {
  Section.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((sectionData) => {
      if (!sectionData) {
        next(new NotFoundError('Раздел не найден'));
      } else {
        res.send(sectionData);
      }
    })
    .catch(() => {
      next(new DefaultError('При редактировании раздела произошла ошибка'));
    });
};

module.exports.deleteSection = (req, res, next) => {
  Section.findByIdAndDelete(req.params.id)
    .then((sectionData) => {
      if (!sectionData) {
        next(new NotFoundError('Раздел не найден'));
      } else {
        res.send(sectionData);
      }
    })
    .catch(() =>
      next(new DefaultError('При удалении раздела произошла ошибка'))
    );
};
