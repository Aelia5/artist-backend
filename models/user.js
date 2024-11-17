const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  admin: {
    type: Boolean,
  },
});

module.exports = mongoose.model('user', userSchema);
