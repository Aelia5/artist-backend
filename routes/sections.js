const router = require('express').Router();

// const { checkAdmin } = require('../middlewares/checkAdmin');

const { validateSection, validateId } = require('../middlewares/validate');

const {
  createSection,
  editSection,
  deleteSection,
} = require('../controllers/sections');

router.post('/new-section', validateSection, createSection);
router.patch('/:id', validateId, validateSection, editSection);
router.delete('/:id', validateId, deleteSection);

module.exports = router;
