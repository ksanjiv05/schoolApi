const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: String,
  varified: Boolean,
  phone: String,

  password: String,
  // createdAt: {
  //   type: Date,
  //   default: Date.now(),
  // },
});

module.exports = mongoose.model("Admin", userSchema);
