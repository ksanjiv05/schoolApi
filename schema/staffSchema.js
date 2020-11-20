const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffId: String,
  stsffType: String,
  staffJobType: String,
  staffDicrip: String,
  staffSpeicalization: String,
  staffMaxQulification: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
