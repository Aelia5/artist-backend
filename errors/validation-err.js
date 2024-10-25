const { VALIDATION_ERROR_CODE } = require('../utils/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = VALIDATION_ERROR_CODE;
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;
