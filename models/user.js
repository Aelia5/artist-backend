const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальное число символов: 2'],
    maxlength: [20, 'Максимальное число символов: 20'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Введён некорректный email.',
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
