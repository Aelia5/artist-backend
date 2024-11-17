const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  picture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'picture',
    required: true,
  },
  header: {
    type: String,
  },
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  telephone: {
    type: String,
  },
  email: {
    type: String,
  },
  sent: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('request', requestSchema);
