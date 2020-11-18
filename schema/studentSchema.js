
//lastname: "xxx"
// marksheet: "C:\fakepath\Screenshot (15).png"
// signature: "blob:http://localhost:3000/d26fcd07-6f87-4753-a6ef-d416c47d5e1b"


const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  id: String,
  email:String,
  rollnumber:String,
  name: String,
  father: String,
  fathermob: String,
  gender:String,
  zip:String,
  state:String,
  school:String,
  qulification:String,
  prevedu:String,
  percentage:String,
  occupation:String,
  mothermob:String,
  mother:String,
  marks:String,
  dist:String,
  city:String,
  dob:String,
  address:String,
  profile:String,
  marksheet:String,
  signature:String,
  admissionStatus:String
});

module.exports = mongoose.model("Student", studentSchema);