const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  ctitle: String,
  ccode: String,
  stream: String,

  bclass: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Course", courseSchema);
