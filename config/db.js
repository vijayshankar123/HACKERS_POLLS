const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MONGOURI");

//connecting mongodb DB
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb has started ...");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
