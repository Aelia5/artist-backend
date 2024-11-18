const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  nameRu: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('section', sectionSchema);
