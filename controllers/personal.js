const Personals = require("../Models/Personals");
const FetchPersonals = require("../Models/FetchPersonals");
const mongoose = require("mongoose");
const chunk = require("chunk");

// const createDetails =  async(req,res)=>{
//     try{
//         mongoose.connect(
//             "mongodb+srv://VedantKashettiwar:Wohlig%40123@cluster0.0l1d7r7.mongodb.net/Details?authSource=admin&replicaSet=atlas-uy925y-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true",function (err, db) {
//                 // Get the collection
//                 var col = db.collection("personals");

//                 // Initialize the Ordered Batch
//                 // You can use initializeUnorderedBulkOp to initialize Unordered Batch
//                 var bulk = col.initializeOrderedBulkOp();

// for (var i = 0; i < 2000; ++i) {
//   bulk.insert({
//     name: "Vedant",
//     email: "kvedant164@gmail.com",
//     phone: 7020576985,
//   });
//   bulk.insert({
//     name: "Tanmay",
//     email: "tanmay@gmail.com",
//     phone: 7020576985,
//   });
//   bulk.insert({
//     name: "Akshata",
//     email: "akshata@gmail.com",
//     phone: 7020576985,
//   });
//   bulk.insert({
//     name: "Saurabh",
//     email: "saurabh@gmail.com",
//     phone: 7020576985,
//   }),
//     bulk.insert({
//       name: "Rahul",
//       email: "rahul@gmail.com",
//       phone: 7020576985,
//     });
// }

//                 // Execute the operations
//                 bulk.execute(function (err, result) {
//                   console.dir(err);
//                   res.status(200).json("Added Succesfully");
//                   db.close();
//                 });
//               }
//             );
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// } //insertmany

const createDetails = async (req, res) => {
  try {
    for (var i = 0; i < 2000; ++i) {
      Personals.bulkWrite([
        {
          insertOne: {
            document: {
              name: "Vedant",
              email: "kvedant164@gmail.com",
              phone: 7020576985,
            },
          },
        },
        {
          insertOne: {
            document: {
              name: "Tanmay",
              email: "tanmay@gmail.com",
              phone: 7020576985,
            },
          },
        },
        {
          insertOne: {
            document: {
              name: "Akshata",
              email: "akshata@gmail.com",
              phone: 7020576985,
            },
          },
        },
        {
          insertOne: {
            document: {
              name: "Saurabh",
              email: "saurabh@gmail.com",
              phone: 7020576985,
            },
          },
        },
        {
          insertOne: {
            document: {
              name: "Rahul",
              email: "rahul@gmail.com",
              phone: 7020576985,
            },
          },
        },
      ]);
    }
    res.status(200).json("Added Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
}; //bulkwrite

const showDetails = async (req, res) => {
  try {
    const result = await Personals.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const savePersonal = (item) => {
  const add = {
    name: item.name,
    email: item.email,
    phone: item.phone,
  };
  return { insertOne: { document: add } };
};

const fetchDetails = async (req, res) => {
  try {
    const arrayDetails = await Personals.find();
    const data = chunk(arrayDetails, 500);
    function saveData(index, data, res) {
      if (index === data.length) {
        return res.status(200).send("Fetch And Saved");
      } else {
        const array = data[index];
        const newArray = array.map(savePersonal);
        FetchPersonals.bulkWrite(newArray);
        saveData(index + 1, data, res);
      }
    }
    saveData(0, data, res);
  } catch (err) {
    res.status(500).send(err);
  }
};

const saveDetailsByPagination = async (req, res) => {
  try {
    const arrayDetails = await Personals.find();
    const data = chunk(arrayDetails, 50);
    function saveData(index, data, res) {
      if (index === data.length) {
        return res.status(200).send("Fetch And Saved");
      } else {
        let array = data[index];
        function saveArraydata(indexMain, array, start_, end_, limit) {
          let al = array.length / limit;
          al = Math.ceil(al);
          if (indexMain !== al) {
            let start = start_;
            let end = end_;
            let array1 = array.slice(start, end);
            // console.log(array1)
            const newArray = array1.map(savePersonal);
            FetchPersonals.bulkWrite(newArray);
            start = start + limit;
            end = end + limit;
            saveArraydata(indexMain + 1, array, start, end, limit);
          } else {
            return false;
          }
        }
        let limit = 2;
        saveArraydata(0, array, 0, limit, limit);
        saveData(index + 1, data, res);
      }
    }
    saveData(0, data, res);
  } catch (err) {
    res.status(500).send("Error");
  }
};

const pagination =async (page, limit)=>{
  const data = await Personals.find().skip((page - 1) * limit).limit(limit);
  if(data.length == 0){
    return {
      next: false,
      page: page,
      limit: limit,
      data: data
    }
  }
  else{
    return {
      next: true,
      page: page,
      limit: limit,
      data: data
    }
  }
}

const saveDetailsByPagination2 = async (req, res) => {
  try {
    const saveArraydata = async (page, limit) => {
      const pageData = await pagination(page,limit)
      if (pageData.next) {
        const newArray = pageData.data.map(savePersonal);
        FetchPersonals.bulkWrite(newArray);
        saveArraydata(pageData.page + 1, pageData.limit);
      } else {
        res.status(200).json("Fetch and Save");
      }
    };
    saveArraydata(1, 10);
  } catch (err) {
    res.status(500).send("Error");
  }
};

module.exports = {
  createDetails,
  fetchDetails,
  showDetails,
  saveDetailsByPagination,
  saveDetailsByPagination2,
};
