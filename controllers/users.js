const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const sendEmail = require('../utils/email');

const User = require('../models/user');
const ConflictError = require('../errors/conflict-err');
const ValidationError = require('../errors/validation-err');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const EmailError = require('../errors/email-error');
const DefaultError = require('../errors/default-err');

const {
  validationErrorMessage,
  defaultErrorMessage,
} = require('../utils/constants');

const notFoundMessage = 'Такой пользователь не существует';
const conflictMessage = 'Пользователь с такой почтой уже существует';

const { SUCCESS_CODE } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET, ADMIN_EMAIL } = process.env;

const {
  confirmLetter,
  resetPasswordLetter,
  changeEmailLetter,
} = require('../utils/letters');

const adminEmail = NODE_ENV ? ADMIN_EMAIL : 'lov800@yandex.ru';

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      verified: false,
      token: crypto.randomBytes(32).toString('hex'),
      admin: req.body.email === adminEmail,
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
          next(new ValidationError(validationErrorMessage));
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
        next(new ValidationError('Пользователь не найден'));
      }
      if (user.verified === true) {
        next(
          new ValidationError('Пользователь уже подтвердил свою регистрацию')
        );
      } else if (user.token !== req.params.token) {
        next(new ValidationError('Токен для подтверждения некорректен'));
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
    .catch(() => {
      next(new DefaultError('При подтверждении регистрации произошла ошибка.'));
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильный логин или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError('Неправильный логин или пароль');
        }

        return user;
      });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.sendResetEmail = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        next(
          new UnauthorizedError('Пользователя с такой почтой не существует')
        );
      } else if (!user.verified) {
        next(new UnauthorizedError('Регистрация пользователя не подтверждена'));
      }
      return user;
    })
    .then((user) =>
      User.findByIdAndUpdate(
        user._id,
        {
          token: crypto.randomBytes(32).toString('hex'),
        },
        { new: true, runValidators: true }
      )
    )
    .then(async (user) => {
      const message = resetPasswordLetter(user);
      await sendEmail(
        user.email,
        'Resetting password on Sabina Tari’s site',
        message
      )
        .then(() => {
          res.send({ message: 'Письмо отправлено' });
        })
        .catch(() => {
          next(new EmailError());
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else {
        next(new DefaultError('При сбросе пароля произошла ошибка.'));
      }
    });
};

module.exports.checkResetLink = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new ValidationError('Пользователь не найден'));
      } else if (user.token !== req.params.token) {
        next(new ValidationError('Токен для сброса пароля некорректен'));
      } else res.send(user);
    })
    .catch(() => {
      next(new DefaultError('При сбросе пароля произошла ошибка.'));
    });
};

module.exports.resetPasword = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        next(new ValidationError('Пользователь не найден'));
      } else if (user.token !== req.params.token) {
        next(new ValidationError('Токен для сброса пароля некорректен'));
      } else {
        bcrypt.hash(req.body.password, 10).then((hash) => {
          User.findByIdAndUpdate(
            req.params.id,
            { password: hash, token: '' },
            { new: true, runValidators: true }
          ).then((userData) => res.status(SUCCESS_CODE).send(userData));
        });
      }
    })
    .catch(() => {
      next(new DefaultError(defaultErrorMessage));
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findById(req.user).then((user) => {
    if (!user) {
      next(new NotFoundError(notFoundMessage));
    } else if (user.email === req.body.email) {
      User.findByIdAndUpdate(
        req.user,
        { name: req.body.name },
        { new: true, runValidators: true }
      )
        .then((userData) => {
          res.send(userData);
        })
        .catch(() => {
          next(new DefaultError('При обновлении профиля произошла ошибка.'));
        });
    } else {
      User.findByIdAndUpdate(
        req.user,
        {
          name: req.body.name,
          email: req.body.email,
          verified: false,
          token: crypto.randomBytes(32).toString('hex'),
        },
        { new: true, runValidators: true }
      )
        .then(async (userData) => {
          const message = changeEmailLetter(userData);
          await sendEmail(
            user.email,
            'Confirming e-mail on Sabina Tari’s site!',
            message
          )
            .then(() => {
              res.send(userData);
            })
            .catch(() => {
              next(new EmailError());
            });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError(conflictMessage));
          } else {
            next(new DefaultError('При обновлении профиля произошла ошибка.'));
          }
        });
    }
  });
};

module.exports.changePassword = (req, res, next) => {
  User.findById(req.user)
    .select('+password')
    .then((user) =>
      bcrypt.compare(req.body.oldPassword, user.password).then((matched) => {
        if (!matched) {
          next(new NotFoundError('Старый пароль введён неверно'));
        }
      })
    )
    .then(() => {
      bcrypt
        .hash(req.body.newPassword, 10)
        .then((hash) => {
          User.findByIdAndUpdate(
            req.user._id,
            { password: hash },
            { new: true, runValidators: true }
          ).then((userData) => {
            if (!userData) {
              next(new NotFoundError(notFoundMessage));
            } else {
              res.status(SUCCESS_CODE).send(userData);
            }
          });
        })
        .catch(() => {
          next(new DefaultError('При смене пароля произошла ошибка.'));
        });
    });
};
