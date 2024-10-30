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
const {
  createUser,
  confirmUser,
  login,
  sendResetEmail,
  checkResetLink,
  resetPasword,
} = require('../controllers/users');

router.post('/signin', validateEmail, validatePassword, login);
router.post(
  '/signup',
  validateUserName,
  validateEmail,
  validatePassword,
  createUser
);
router.get('/verify/:id/:token', validateId, validateToken, confirmUser);
router.post('/reset-password', validateEmail, sendResetEmail);
router.get('/reset/:id/:token', validateId, validateToken, checkResetLink);
router.patch(
  '/reset/:id/:token',
  validateId,
  validateToken,
  validatePassword,
  resetPasword
);
// router.use(auth);
// router.use('/users', userRouter);
// router.use('/houses', houseRouter);
router.use('*', (req, res, next) => {
  const error = new NotFoundError('Страница по указанному маршруту не найдена');
  next(error);
});

module.exports = router;
