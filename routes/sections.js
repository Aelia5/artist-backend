const router = require('express').Router();

// const { checkAdmin } = require('../middlewares/checkAdmin');

const { validateSection } = require('../middlewares/validate');

const {
  createSection,
  editSection,
  deleteSection,
} = require('../controllers/sections');

router.post('/new-section', validateSection, createSection);
router.patch('/:id', validateSection, editSection);
router.delete('/:id', deleteSection);

module.exports = router;
