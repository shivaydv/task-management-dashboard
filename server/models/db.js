const mongoose = require("mongoose");
require("dotenv").config();

const mongo_url = process.env.MONGO_URI;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });
