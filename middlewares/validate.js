const { celebrate, Joi } = require('celebrate');

module.exports.validateUserName = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
});

module.exports.validateSection = celebrate({
  body: Joi.object()
    .keys({
      nameRu: Joi.string().required().min(2).max(30),
      nameEn: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
});

module.exports.validateSeries = celebrate({
  body: Joi.object()
    .keys({
      nameRu: Joi.string().required().min(2).max(30),
      nameEn: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
});

module.exports.validatePicture = celebrate({
  body: Joi.object()
    .keys({
      nameRu: Joi.string().required().min(2).max(100),
      nameEn: Joi.string().required().min(2).max(100),
      link: Joi.string()
        .pattern(
          /^https?:\/\/[a-z0-9\-_.]{1,30}\.[a-z0-9.]{2,6}[a-z0-9\-._~:?#[\]/@!$&*+,;=]{0,1000}$/i
        )
        .required(),
      created: Joi.number().integer().min(2020).max(2100),
      priceRub: Joi.number().min(0).max(1000000),
      priceEur: Joi.number().min(0).max(10000),
      charactersRu: Joi.string().min(2).max(300),
      charactersEn: Joi.string().min(2).max(300),
      ownerRu: Joi.string().min(2).max(100),
      ownerEn: Joi.string().min(2).max(100),
      techniqueRu: Joi.string().min(2).max(100),
      techniqueEn: Joi.string().min(2).max(100),
      sizeRu: Joi.string().min(2).max(30),
      sizeEn: Joi.string().min(2).max(30),
    })
    .unknown(true),
});

module.exports.validateEmail = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .unknown(true),
});

module.exports.validatePassword = celebrate({
  body: Joi.object()
    .keys({
      password: Joi.string().required().min(7),
    })
    .unknown(true),
});

module.exports.validateTwoPasswords = celebrate({
  body: Joi.object()
    .keys({
      oldPassword: Joi.string().required().min(7),
      newPassword: Joi.string().required().min(7),
    })
    .unknown(true),
});

module.exports.validateId = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).hex().required(),
    })
    .unknown(true),
});

module.exports.validateToken = celebrate({
  params: Joi.object()
    .keys({
      token: Joi.string().length(64).hex().required(),
    })
    .unknown(true),
});

module.exports.validateRequest = celebrate({
  body: Joi.object()
    .keys({
      header: Joi.string().min(2).max(100),
      telephone: Joi.string().regex(/^\+?[/.()-]*([0-9][/.()-]*){9,}$/),
      email: Joi.string().email(),
      text: Joi.string().min(2).max(1000),
      author: Joi.string().min(2).max(60),
    })
    .unknown(true),
});
