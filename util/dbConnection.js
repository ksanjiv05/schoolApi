const mongoose = require("mongoose");

const mongoDB = "mongodb://127.0.0.1/schoolApi";
module.exports.dbConnection = mongoose.connect(mongoDB, {
  useNewUrlParser: true,
});