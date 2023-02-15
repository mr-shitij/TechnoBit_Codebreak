const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const geohash = require('geohash');

// function calculateGeohash(location) {
//   const { latitude, longitude } = location;
//   const hash = geohash.encode(latitude, longitude);
//   return hash;
// }

const Vehicle = new Schema({
  vehicleNumber:{
    type: 'String',
    required: true,
    unique: true
  },
  nameWithModel: {
    type: String,
    required: true
  },
  totalcapacity: {
    type: Number,
    required: true
  },
  availableCapacity:{
    type: Number,
    required: true
  },
  currSpeed: {
    type: Number,
    required: true
  },
  currAcceleration: {
    type: Number,
    required: true
  },
  enginePower: {
    type: Number,
    required: true
  },
  fuelUsed : {
    type: Number,
    required: true
  },
  currentLocation: {
    type: Object,
    required: true
  },
  // geohash: {
  //   type: String,
  //   default: function() {
  //     return calculateGeohash(this.currentLocation);
  //   }
  // },
  srcLocation: {
    type: Object,
    required: true,
  },
  destLocation: {
    type: Object,
    required: true
  },
  mileage : {
    type: Number,
    required: true
  },
  tyrePressure: {
    type: Number,
    required: true
  },
  rpmEngine: {
    type: String,
  },
  pedalPosition: {
    type: Number,
    required: true
  },
  airFlowRate: {
    type: Number,
    required: true
  },
  coolantTemperature: {
    type: Number,
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  maintainenaceStatus: {
    type: Number, // Serviced : 1 .......servicing remaining : 0
    required: true
  },
  distanceTravelled: {
    type: Number,
    required: true
  },

});

module.exports = mongoose.model("Vehicle", Vehicle);
