const router = require('express').Router();
const {
  validateUserName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validate');

const {
  getCurrentUser,
  updateUser,
  changePassword,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me/userdata', validateUserName, validateEmail, updateUser);

router.patch('/me/pass', validatePassword, changePassword);

module.exports = router;
