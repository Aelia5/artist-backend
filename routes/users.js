const router = require('express').Router();
const { validateUserName, validateEmail } = require('../middlewares/validate');

const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', validateUserName, validateEmail, updateUser);

module.exports = router;
