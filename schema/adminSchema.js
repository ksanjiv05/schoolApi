const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [5, "Please enter valid name"],
    max: 20,
    required: [true, "Name is required !!!"],
  },
  email: String,
  varified: Boolean,
  phone: {
    type: String,
    min: [10, "Please enter valid name"],
    max: 10,
    required: [true, "Phone number is required !!!"],
  },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("User", userSchema);
