const mongoose = require("mongoose");
const uri = "mongodb+srv://hack:1@cluster0.jsmw52r.mongodb.net/test";
mongoose.set('strictQuery', true);


const connectDB = () => {
  return mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
