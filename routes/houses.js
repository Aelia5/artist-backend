const router = require('express').Router();
const {
  validateHouse,
  validateZone,
  validateId,
  validateZoneNumber,
  validateZoneOrder,
  validateTask,
  validateDate,
} = require('../middlewares/validate');

const {
  createHouse,
  getMyHouses,
  deleteHouse,
  renameHouse,
  renameZone,
  reorderZones,
  addTask,
  deleteTask,
  renameTask,
  completeTask,
  resetDate,
} = require('../controllers/houses');

router.post('/new-house', validateHouse, createHouse);

router.get('/find-my-houses', getMyHouses);

router.delete('/:id', validateId, deleteHouse);

router.patch('/:id', validateId, validateHouse, renameHouse);

router.patch('/:id/reorder', validateId, validateZoneOrder, reorderZones);

router.patch(
  '/:id/:zone/',
  validateId,
  validateZoneNumber,
  validateZone,
  renameZone
);

router.patch(
  '/:id/:zone/new-task',
  validateId,
  validateZoneNumber,
  validateTask,
  addTask
);

router.patch(
  '/:id/:zone/:task/delete',
  validateId,
  validateZoneNumber,
  deleteTask
);

router.patch(
  '/:id/:zone/:task/rename',
  validateId,
  validateZoneNumber,
  validateTask,
  renameTask
);

router.patch(
  '/:id/:zone/complete',
  validateId,
  validateZoneNumber,
  validateDate,
  completeTask
);

router.patch('/:id/:zone/reset', validateId, validateZoneNumber, resetDate);

module.exports = router;
