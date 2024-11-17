const Request = require('../models/request');

const ValidationError = require('../errors/validation-err');
const EmailError = require('../errors/email-error');

const sendEmail = require('../utils/email');

const { requestLetter } = require('../utils/letters');
const { SUCCESS_CODE } = require('../utils/constants');

const { NODE_ENV, ADMIN_EMAIL } = process.env;

const adminEmail = NODE_ENV ? ADMIN_EMAIL : 'lov800@yandex.ru';

module.exports.sendRequest = (req, res, next) => {
  if (!req.body.telephone && !req.body.email) {
    next(new ValidationError('Не указаны контакты'));
  } else {
    const { header, text, author, telephone, email } = req.body;
    Request.create({
      picture: req.params.id,
      header,
      text,
      author,
      telephone,
      email,
    })
      .then((request) => Request.findById(request._id).populate('picture'))

      .then(async (request) => {
        const letter = requestLetter(request);
        await sendEmail(
          adminEmail,
          `На сайт поступил новый запрос о картине «${request.picture.name}»`,
          letter
        );
      })
      .then(() => {
        res.status(SUCCESS_CODE).send({ message: 'Письмо отправлено' });
      })

      .catch((err) => {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          next(new ValidationError(err.message));
        } else {
          next(new EmailError());
        }
      });
  }
};
