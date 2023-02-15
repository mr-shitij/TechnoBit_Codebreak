const express = require('express');
const Dispatcher = require('../models/Dispatcher');
const router = express.Router();
const Vehicle = require('../models/Vehicle');
const mongoose = require('mongoose')

let rad = function(x) {
    return x * Math.PI / 180;
};
  
let getDistance = function(p1Lat, p1Long, p2Lat, p2Lng) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2Lat - p1Lat);
    var dLong = rad(p2Lng - p1Lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1Lat)) * Math.cos(rad(p2Lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

router.post("/schedule", (req, res) => {
    const { src, dest, capacity, profitFromDelivery } = req.body;
    console.log(src);
    console.log(dest);
    console.log(capacity);
    console.log(profitFromDelivery);

    Vehicle.findOne(
        {
            currentLocation:
              { 
                $near :
                 {
                   $geometry: { type: "Point",  coordinates: [ src.latitude, src.longitude ] },
                   $minDistance: 0, //In Meters
                   $maxDistance: 20000
                 }
              },
              availableCapacity:
              {
                $gte: capacity
              },
              maintainenaceStatus:{
                $eq: 1
              },
              
          }        
        , (err, data) => 
        {
            if (err) return res.status(500).send(err);
            if (!data) return res.status(404).send("data not found");
            
            let new_cap = data[0].capacity - capacity;
            Vehicle.updateOne({capacity : new_cap})
            res.send(data);
        }
    )    
});

module.exports = router;
