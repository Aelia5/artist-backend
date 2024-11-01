const jwt = require('jsonwebtoken');
const process = require('process');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(
      new UnauthorizedError(
        'При авторизации произошла ошибка. Токен не передан или передан не в том формате.'
      )
    );
  }
  const token = authorization.replace('Bearer ', '');
  const { NODE_ENV, JWT_SECRET } = process.env;
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      next(
        new UnauthorizedError(
          'При авторизации произошла ошибка. Переданный токен некорректен.'
        )
      );
    } else {
      next(err);
    }
  }
  req.user = payload;
  next();
};
