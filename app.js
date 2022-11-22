const mongoose = require("mongoose");
const express = require("express");
const app = express();
const createDetails = require("./routes/personal");
app.use(express.json()); //middleware
app.use("/create/", createDetails);

app.listen(8000, () => {
  console.log("listening the port at 8000");
});

const startDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://VedantKashettiwar:Wohlig%40123@cluster0.0l1d7r7.mongodb.net/Details?authSource=admin&replicaSet=atlas-uy925y-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true");
      console.log("Connected Succesfully....");
    
  } catch (err) {
    console.log(err);
  }
};
startDB();
