const { DEFAULT_ERROR_CODE } = require('../utils/constants');

module.exports.handleError = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;
  res
    .status(statusCode)
    .send({
      message: message || 'На сервере произошла ошибка',
    });
  next();
};
