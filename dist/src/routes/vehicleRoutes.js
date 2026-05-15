const express = require('express');
const vehicleController = require('../controllers/vehicleController');
const authController = require('../controllers/authController');

const router = express.Router();

// Public route to view fleet
router.get('/', vehicleController.getAllVehicles);

// Protected Admin Routes
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

router.post('/', vehicleController.createVehicle);
router
  .route('/:id')
  .patch(vehicleController.updateVehicle)
  .delete(vehicleController.deleteVehicle);

module.exports = router;
