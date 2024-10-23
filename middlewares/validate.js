const { celebrate, Joi } = require('celebrate');

module.exports.validateUserName = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(20),
    })
    .unknown(true),
});

module.exports.validateHouse = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
    })
    .unknown(true),
});

module.exports.validateZone = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(100),
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

module.exports.validateTask = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(300),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object()
    .keys({
      id: Joi.string().length(24).hex().required(),
    })
    .unknown(true),
});

module.exports.validateZoneNumber = celebrate({
  params: Joi.object()
    .keys({
      zone: Joi.number().min(0).max(4),
    })
    .unknown(true),
});

module.exports.validateDate = celebrate({
  body: Joi.object()
    .keys({
      fulfilled: Joi.date() || '',
    })
    .unknown(true),
});

module.exports.validateZoneOrder = celebrate({
  body: Joi.object().keys({
    newOrder: Joi.array().items(Joi.number().min(1).max(5)).length(5).unique(),
  }),
});
