const router = require('express').Router();
const { validatePicture, validateId } = require('../middlewares/validate');

const {
  createPicture,
  editPicture,
  deletePicture,
} = require('../controllers/pictures');

const { checkAdmin } = require('../middlewares/checkAdmin');

router.post('/new-picture', checkAdmin, validatePicture, createPicture);

router.patch('/:id', checkAdmin, validateId, validatePicture, editPicture);

router.delete('/:id', checkAdmin, validateId, deletePicture);

// router.get('/find-my-houses', getMyHouses);

// router.delete('/:id', validateId, deleteHouse);

// router.patch('/:id', validateId, validateHouse, renameHouse);

// router.patch('/:id/reorder', validateId, validateZoneOrder, reorderZones);

// router.patch(
//   '/:id/:zone/',
//   validateId,
//   validateZoneNumber,
//   validateZone,
//   renameZone
// );

// router.patch(
//   '/:id/:zone/new-task',
//   validateId,
//   validateZoneNumber,
//   validateTask,
//   addTask
// );

// router.patch(
//   '/:id/:zone/:task/delete',
//   validateId,
//   validateZoneNumber,
//   deleteTask
// );

// router.patch(
//   '/:id/:zone/:task/rename',
//   validateId,
//   validateZoneNumber,
//   validateTask,
//   renameTask
// );

// router.patch(
//   '/:id/:zone/complete',
//   validateId,
//   validateZoneNumber,
//   validateDate,
//   completeTask
// );

// router.patch('/:id/:zone/reset', validateId, validateZoneNumber, resetDate);

module.exports = router;
