const router = require('express').Router();

const { validateSeries, validateId } = require('../middlewares/validate');

const {
  createSeries,
  editSeries,
  deleteSeries,
} = require('../controllers/series');

router.post('/new-series', validateSeries, createSeries);
router.patch('/:id', validateId, validateSeries, editSeries);
router.delete('/:id', validateId, deleteSeries);

module.exports = router;
