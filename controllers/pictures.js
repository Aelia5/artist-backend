const Picture = require('../models/picture');

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

module.exports.createPicture = (req, res, next) => {
  const picture = req.body;
  Picture.create(picture)
    .then((pictureData) => res.status(SUCCESS_CODE).send(pictureData))
    .catch(() => {
      next(new DefaultError('При добавлении картины произошла ошибка'));
    });
};
