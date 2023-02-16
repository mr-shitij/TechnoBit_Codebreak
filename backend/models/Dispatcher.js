const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Dispatcher = new Schema({
  vehicleNumber:{
    type: String,
    required: true,
    index: true
  },
  totalcapacity: {
    type: Number,
    required: true
  },
  availableCapacity:{
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
  maintainenaceStatus: {
    type: Number, // Serviced : 1 .......servicing remaining : 0
    required: true
  },
  distanceTravelled: {
    type: Number,
    required: true
  },

});

module.exports = mongoose.model("Dispatcher", Dispatcher);
