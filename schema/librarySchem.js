const mongoose = require("mongoose");

const librarySchema = new mongoose.Schema({
  // _id: ObjectID,
  bookTitle: {
    type: String,
    min: [5, "Please enter valid name"],
    max: 20,
    required: [true, "Name is required !!!"],
  },
  bookAuthor: String,
  bookEdition: String,
  bookDisription: String,
  year: String,
  publication: String,
  bookRating: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Library", librarySchema);
