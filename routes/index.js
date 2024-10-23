const router = require('express').Router();
// const userRouter = require('./users');
const {
  validateUserName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validate');

// const houseRouter = require('./houses');
// const { auth } = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const { login, createUser } = require('../controllers/users');

// router.post('/signin', validateEmail, validatePassword, login);
router.post(
  '/signup',
  validateUserName,
  validateEmail,
  validatePassword,
  createUser
);
// router.use(auth);
// router.use('/users', userRouter);
// router.use('/houses', houseRouter);
router.use('*', (req, res, next) => {
  const error = new NotFoundError('Страница по указанному маршруту не найдена');
  next(error);
});

module.exports = router;
