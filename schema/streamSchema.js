const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  scode: {
    type: String,
    min: [5, "Please enter valid name"],
    max: 20,
    required: [true, "Name is required !!!"],
  },
  acadamictype: Boolean,
  sclass: {
    type: String,
    min: [10, "Please enter valid name"],
    max: 10,
    required: [true, "Phone number is required !!!"],
  },
  bclass: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
