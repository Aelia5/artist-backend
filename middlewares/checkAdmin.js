const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const User = require('../models/user');

module.exports.checkAdmin = (req, res, next) => {
  User.findById(req.user)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
      }
      if (!user.admin) {
        next(
          new ForbiddenError('Нет администраторских прав для этого действия')
        );
      }
      next();
    })
    .catch((err) => {
      next(err);
    });
};
