const fs = require("fs");
const mongoose = require("mongoose");
const Vehicle = require("./models/Vehicle");
mongoose.set('strictQuery', true);
// Connect to the MongoDB database
mongoose
  .connect("mongodb+srv://hack:1@cluster0.jsmw52r.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database: ", err);
  });
const vehicleData = new Vehicle ({
  nameWithModel: 'Test Vehicle 1',
  vehicleNumber: 'MH12AS4343',
  totalcapacity: 20000,
  availableCapacity: 8000,
  currSpeed: 0,
  currAcceleration: 0,
  enginePower: 100,
  fuelUsed: 0,
  currentLocation: { latitude: 1.234567, longitude: 2.345678 },
  srcLocation: { latitude: 1.234567, longitude: 2.345678 },
  destLocation: { latitude: 2.345678, longitude: 3.456789 },
  mileage: 0,
  tyrePressure: 30,
  rpmEngine: '1000',
  pedalPosition: 0,
  airFlowRate: 0,
  coolantTemperature: 0,
  driverName: 'Test Driver',
  maintainenaceStatus: 1,
  distanceTravelled: 0,
});

vehicleData
  .save()
  .then((result) => {
    console.log("Vehicle added successfully!", result);
  })
  .catch((err) => {
    console.error(err);
  });