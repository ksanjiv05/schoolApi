const mongoose = require("mongoose");
const librarySchem = require("../schema/librarySchem");

const dbCon = require("../util/dbConnection");
/***===========panding------------------- */
module.exports.addEBook = async (req, res) => {
  try {
    let book = new librarySchem(req.body);
    await book.save(function (err, data) {
      if (err) {
        console.log(err);
        res.status(403).send(" failed .");
      } else {
        console.log(data);
        res.status(200).send("book successfully added .");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.uploadEbook = async (req, res) => {
  console.log(req.files);
  if (req.files != null) return res.send("uploaded");
  else return res.send("upload failed");
};
