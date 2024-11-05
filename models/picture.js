const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) =>
        /https?:\/\/[a-z0-9\-_.]{1,30}\.[a-z0-9.]{2,6}[a-z0-9\-._~:?#[\]/@!$&*+,;=]{0,1000}/i.test(
          v
        ),
      message: 'Введена некорректная ссылка',
    },
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  created: {
    type: Number,
  },
  price: {
    type: Number,
  },
  characters: {
    type: String,
  },

  owner: {
    type: String,
  },
  technique: {
    type: String,
  },
  size: {
    type: String,
  },
  sections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'section',
      required: true,
    },
  ],
  series: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'series',
      default: [],
    },
  ],
});

module.exports = mongoose.model('picture', pictureSchema);
