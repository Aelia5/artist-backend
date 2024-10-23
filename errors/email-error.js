const { DEFAULT_ERROR_CODE } = require('../utils/constants');

class EmailError extends Error {
  constructor() {
    super();
    this.message = 'Отправка письма не удалась';

    this.statusCode = DEFAULT_ERROR_CODE;
  }
}

module.exports = EmailError;
