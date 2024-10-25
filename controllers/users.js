const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const sendEmail = require('../utils/email');

// const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const ValidationError = require('../errors/validation-err');
// const NotFoundError = require('../errors/not-found-err');
// const UnauthorizedError = require('../errors/unauthorized-err');
const EmailError = require('../errors/email-error');
const DefaultError = require('../errors/default-err');
// const { send } = require('process');

// const { validationErrorMessage } = require('../utils/constants');

// const notFoundMessage = 'Такой пользователь не существует';
// const unauthorizedMessage = 'Вы ввели неправильный логин или пароль';
const conflictMessage = 'Пользователь с такой почтой уже существует';

// const { SUCCESS_CODE } = require('../utils/constants');

// const { NODE_ENV, BASE_URL } = process.env;

const { confirmLetter } = require('../utils/letters');
const { SUCCESS_CODE } = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      verified: false,
      token: crypto.randomBytes(32).toString('hex'),
    })
      .then(async (user) => {
        const message = confirmLetter(user);
        await sendEmail(user.email, 'Welcome to Sabina Tari’s site!', message)
          .then(() => {
            res.send({ message: 'Письмо отправлено' });
          })
          .catch(() => {
            next(new EmailError());
          });
      })

      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError(conflictMessage));
        } else if (err.name === 'ValidationError') {
          next(new ValidationError(err.message));
        } else {
          next(
            new DefaultError('При регистрации пользователя произошла ошибка.')
          );
        }
      });
  });
};

module.exports.confirmUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new ValidationError('Пользователь не найден');
      }
      if (user.verified === true) {
        throw new ValidationError(
          'Пользователь уже подтвердил свою регистрацию'
        );
      } else if (user.token !== req.params.token) {
        throw new ValidationError('Токен для подтверждения некорректен');
      } else {
        User.findByIdAndUpdate(
          user._id,
          { verified: true, token: '' },
          { new: true, runValidators: true }
        ).then((userData) => {
          res.status(SUCCESS_CODE).send(userData);
        });
      }
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else {
        next(
          new DefaultError('При подтверждении регистрации произошла ошибка.')
        );
      }
    });
};

// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;
//   User.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         throw new UnauthorizedError(unauthorizedMessage);
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             throw new UnauthorizedError(unauthorizedMessage);
//           }
//           return (user);
//         });
//     })
//     .then((user) => {
//       const { NODE_ENV, JWT_SECRET } = process.env;
//       const token = jwt.sign(
//         { _id: user._id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//                 { expiresIn: '7d' },
//       );
//       res.send({ token });
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

// module.exports.getCurrentUser = (req, res, next) => {
//   User.findById(req.user._id)
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

// module.exports.updateUser = (req, res, next) => {
//   User.findByIdAndUpdate(
//     req.user,
//     { name: req.body.name, email: req.body.email },
//     { new: true, runValidators: true },
//   )
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundError(notFoundMessage);
//       } else {
//         res.send(user);
//       }
//     })
//     .catch((err) => {
//       if (err.name === 'CastError' || err.name === 'ValidationError') {
//         next(new ValidationError(err.message || validationErrorMessage));
//       } else if (err.code === 11000) {
//         next(new ConflictError(conflictMessage));
//       } else {
//         next(new DefaultError('При обновлении профиля произошла ошибка.'));
//       }
//     });
// };
