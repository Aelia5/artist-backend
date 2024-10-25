const router = require('express').Router();
// const userRouter = require('./users');
const {
  validateUserName,
  validateEmail,
  validatePassword,
  validateId,
  validateToken,
} = require('../middlewares/validate');

// const houseRouter = require('./houses');
// const { auth } = require('../middlewares/auth');

const NotFoundError = require('../errors/not-found-err');
const { createUser, confirmUser } = require('../controllers/users');

// router.post('/signin', validateEmail, validatePassword, login);
router.post(
  '/signup',
  validateUserName,
  validateEmail,
  validatePassword,
  createUser
);
router.get('/verify', (req, res) => {
  res.send('ok');
});
router.get('/verify/:id/:token', validateId, validateToken, confirmUser);
// router.use(auth);
// router.use('/users', userRouter);
// router.use('/houses', houseRouter);
router.use('*', (req, res, next) => {
  const error = new NotFoundError('Страница по указанному маршруту не найдена');
  next(error);
});

module.exports = router;
