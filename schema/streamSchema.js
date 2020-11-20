const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  acadamictype: Boolean,
  sclass: String,
  bclass: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
