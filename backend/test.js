const request = require('supertest');
const mongoose = require('mongoose');
const app = require('express'); // assuming your Express app is exported from app.js
const Vehicle = require('./models/Vehicle');

// Test data
const testVehicleData = {
  vehicleNumber: 'ABCD1234',
  nameWithModel: 'Test Vehicle',
  totalcapacity: 10,
  availableCapacity: 8,
  currSpeed: 60,
  currAcceleration: 2.5,
  enginePower: 120,
  fuelUsed: 25,
  currentLocation: { latitude: 37.7749, longitude: -122.4194 },
  srcLocation: { latitude: 37.7749, longitude: -122.4194 },
  destLocation: { latitude: 37.3382, longitude: -121.8863 },
  mileage: 30,
  tyrePressure: 35,
  pedalPosition: 60,
  airFlowRate: 10,
  coolantTemperature: 70,
  driverName: 'John Doe',
  maintainenaceStatus: 1,
  distanceTravelled: 100
};

// Use Jest to test the endpoint
describe('GET /vehicles/:id', () => {
  let testVehicle;
  let testVehicleId;

  beforeAll(async () => {
    // Connect to the MongoDB test database
    const url = 'mongodb://localhost:27017/test';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create a test vehicle in the database
    testVehicle = await Vehicle.create(testVehicleData);
    testVehicleId = testVehicle._id;
  });

  afterAll(async () => {
    // Remove the test vehicle from the database and disconnect
    await Vehicle.deleteMany();
    await mongoose.connection.close();
  });

  test('should return a specific vehicle by ID', async () => {
    const response = await request(app).get(`/vehicles/${testVehicleId}`).send();

    expect(response.status).toBe(200);
    expect(response.body._id).toEqual(testVehicleId.toString());
    expect(response.body.vehicleNumber).toBe(testVehicleData.vehicleNumber);
    expect(response.body.nameWithModel).toBe(testVehicleData.nameWithModel);
    // Add more expectations as needed for the other fields
  });

  test('should return 404 if vehicle not found', async () => {
    const invalidId = mongoose.Types.ObjectId();
    const response = await request(app).get(`/vehicles/${invalidId}`).send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Cannot find vehicle');
  });
});
