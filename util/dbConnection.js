require("dotenv").config();
const mongoose = require("mongoose");
const uri = "mongodb+srv://ksanjiv0005:Ki$h@n0005@schoolapi.d3jme.mongodb.net/sdfghjklfcvbnm?retryWrites=true&w=majority";
console.log("database ",process.env.DATABASE_URI)
// const mongoDB = "mongodb://schoolapi-shard-00-01.d3jme.mongodb.net:27017/sdfghjklfcvbnm";
module.exports.dbConnection = mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true,
});



// const MongoClient = require('mongodb').MongoClient;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
