const Personals = require("../Models/Personals");
const FetchPersonals = require("../Models/FetchPersonals");
const mongoose = require("mongoose");
const chunk = require("chunk");

const createDetails =  async(req,res)=>{
    try{
        mongoose.connect(
            "mongodb+srv://VedantKashettiwar:Wohlig%40123@cluster0.0l1d7r7.mongodb.net/Details?authSource=admin&replicaSet=atlas-uy925y-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",function (err, db) {
                // Get the collection
                var col = db.collection("personals");

                // Initialize the Ordered Batch
                // You can use initializeUnorderedBulkOp to initialize Unordered Batch
                var bulk = col.initializeOrderedBulkOp();

                for (var i = 0; i < 2000; ++i) {
                  bulk.insert({
                    name: "Vedant",
                    email: "kvedant164@gmail.com",
                    phone: 7020576985,
                  });
                  bulk.insert({
                    name: "Tanmay",
                    email: "tanmay@gmail.com",
                    phone: 7020576985,
                  });
                  bulk.insert({
                    name: "Akshata",
                    email: "akshata@gmail.com",
                    phone: 7020576985,
                  });
                  bulk.insert({
                    name: "Saurabh",
                    email: "saurabh@gmail.com",
                    phone: 7020576985,
                  }),
                    bulk.insert({
                      name: "Rahul",
                      email: "rahul@gmail.com",
                      phone: 7020576985,
                    });
                }

                // Execute the operations
                bulk.execute(function (err, result) {
                  console.dir(err);
                  res.status(200).json("Added Succesfully");
                  db.close();
                });
              }
            );
    }
    catch(err){
        res.status(500).json(err);
    }
}
// const createDetails = async (req, res) => {
//   try {
//     Personals.bulkWrite([
//       {
//         insertOne: {
//           name: "Vedant",
//           email: "kvedant164@gmail.com",
//           phone: 7020576985,
//         },
//       },
//       {
//         insertOne: {
//           name: "Tanmay",
//           email: "tanmay@gmail.com",
//           phone: 7020576985,
//         },
//       },
//       {
//         insertOne: {
//           name: "Akshata",
//           email: "akshata@gmail.com",
//           phone: 7020576985,
//         },
//       },
//       {
//         insertOne: {
//           name: "Saurabh",
//           email: "saurabh@gmail.com",
//           phone: 7020576985,
//         },
//       },
//       {
//         insertOne: {
//           name: "Rahul",
//           email: "rahul@gmail.com",
//           phone: 7020576985,
//         },
//       },
//     ]);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

const showDetails = async (req, res) => {
  try {
    const result = await Personals.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const fetchDetails = async (req, res) => {
  try {
    const arrayDetails = await Personals.find();
    const data = chunk(arrayDetails, 500);
    function saveData(index, data, res) {
      if (index === data.length) {
        return res.status(200).send("Fetch And Saved");
      } else {
        FetchPersonals.insertMany(data[index]);
        saveData(index + 1, data, res);
      }
    }
    saveData(0, data, res);
  } catch (err) {
    res.status(500).send(err);
  }
};
module.exports = { createDetails, fetchDetails, showDetails };