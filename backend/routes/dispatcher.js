const express = require('express');
const Dispatcher = require('../models/Dispatcher');
const router = express.Router();
const Vehicle = require('../models/Vehicle');


router.post("/schedule", (req, res) => {
    const { src, dest, capacity, profitFromDelivery } = req.body;
    console.log(src);
    console.log(dest);
    console.log(capacity);
    console.log(profitFromDelivery);

    Vehicle.find(
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
            res.send(data);
        }
    )
});

module.exports = router;
