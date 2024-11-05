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
      name: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
});

module.exports.validateSeries = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
});

module.exports.validatePicture = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(100),
      link: Joi.string()
        .pattern(
          /^https?:\/\/[a-z0-9\-_.]{1,30}\.[a-z0-9.]{2,6}[a-z0-9\-._~:?#[\]/@!$&*+,;=]{0,1000}$/i
        )
        .required(),
      created: Joi.number().integer().min(2020).max(2100),
      price: Joi.number().min(0).max(1000000),
      characters: Joi.string().min(2).max(300),
      owner: Joi.string().min(2).max(100),
      technique: Joi.string().min(2).max(100),
      size: Joi.string().min(2).max(30),
      section: Joi.string().min(2).max(30),
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
