const router = require('express').Router();
const { validatePicture, validateId } = require('../middlewares/validate');

const {
  createPicture,
  editPicture,
  deletePicture,
  putLike,
  deleteLike,
} = require('../controllers/pictures');

const { checkAdmin } = require('../middlewares/checkAdmin');

router.post('/new-picture', checkAdmin, validatePicture, createPicture);

router.patch('/:id', checkAdmin, validateId, validatePicture, editPicture);

router.delete('/:id', checkAdmin, validateId, deletePicture);

router.put('/:id/likes', validateId, putLike);

router.delete('/:id/likes', validateId, deleteLike);

module.exports = router;
