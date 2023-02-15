const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const app = require('express')();

const StartupSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number },
  location: { type: String, required: true},
  description: { type: String, required: true},
  internships: [{ type: Schema.Types.ObjectId, ref: "Student" }]
  });
const Startup = mongoose.model("Startup", StartupSchema);

// Define the route for retrieving a list of startups
app.get("/api/startups", (req, res) => {
  Startup.find((err, startups) => {
    if (err) return res.status(500).send(err);
    res.send(startups);
  });
});


module.exports = Startup;