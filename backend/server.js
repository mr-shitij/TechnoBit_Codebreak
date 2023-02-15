const express = require("express");
const mongoose = require("mongoose");

var cors = require('cors');
const app = express();
app.use(cors());

const connectDB = require("./db");

// Init Middleware
app.use(express.json());

// Define Routes

// app.use('/api/manager', require('./routes/manager'))
// app.use('/api/dispatcher', require('./routes/dispatcher'))
app.use('/api/vehicle', require('./routes/vehicle'))

// Connect to MongoDB
connectDB();

const port =  5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
