const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  nameRu: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('series', seriesSchema);
