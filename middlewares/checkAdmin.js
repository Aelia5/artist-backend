const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const User = require('../models/user');

module.exports.checkAdmin = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      if (!user.admin) {
        next(
          new UnauthorizedError('Нет администраторских прав для этого действия')
        );
      }
      next();
    })
    .catch((err) => {
      next(err);
    });
};
