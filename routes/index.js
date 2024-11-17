const router = require('express').Router();
const userRouter = require('./users');
const pictureRouter = require('./pictures');
const sectionRouter = require('./sections');
const seriesRouter = require('./series');

const {
  validateUserName,
  validateEmail,
  validatePassword,
  validateId,
  validateToken,
  validateRequest,
} = require('../middlewares/validate');

const { auth } = require('../middlewares/auth');
const { checkAdmin } = require('../middlewares/checkAdmin');

const NotFoundError = require('../errors/not-found-err');
const {
  createUser,
  confirmUser,
  login,
  sendResetEmail,
  checkResetLink,
  resetPasword,
} = require('../controllers/users');
const { getAllData } = require('../controllers/pictures');
const { sendRequest } = require('../controllers/requests');

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
router.get('/get-data', getAllData);
router.post('/send-request/:id', validateId, validateRequest, sendRequest);
router.use(auth);
router.use('/users', userRouter);
router.use('/pictures', pictureRouter);
router.use(checkAdmin);
router.use('/sections', sectionRouter);
router.use('/series', seriesRouter);
router.use('*', (req, res, next) => {
  const error = new NotFoundError('Страница по указанному маршруту не найдена');
  next(error);
});

module.exports = router;
