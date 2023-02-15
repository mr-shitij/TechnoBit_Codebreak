const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

// create a new vehicle
router.post('/', async (req, res) => {
  try {
    const { vehicleNumber } = req.body.vehicleNumber;
    const existingVehicle = await Vehicle.findOne({ vehicleNumber });

    if (existingVehicle) {
      return res.status(400).json({ message: 'Vehicle number already exists' });
    }

    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific vehicle by ID
router.get('/:id', getVehicle, (req, res) => {
  res.json(res.vehicle);
});

// Update a specific vehicle by ID
router.patch('/:id', getVehicle, async (req, res) => {
  if (req.body.nameWithModel != null) {
    res.vehicle.nameWithModel = req.body.nameWithModel;
  }
  if (req.body.currSpeed != null) {
    res.vehicle.currSpeed = req.body.currSpeed;
  }
  // Update other fields as needed
  try {
    const updatedVehicle = await res.vehicle.save();
    res.json(updatedVehicle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a specific vehicle by ID
router.delete('/:id', getVehicle, async (req, res) => {
  try {
    await res.vehicle.remove();
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a specific vehicle by ID
async function getVehicle(req, res, next) {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (vehicle == null) {
      return res.status(404).json({ message: 'Cannot find vehicle' });
    }
    res.vehicle = vehicle;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
