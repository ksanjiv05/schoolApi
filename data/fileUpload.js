const multer = require("multer");
require("dotenv").config();
//const yourModule = require(__basedir + '/path/to/module.js');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("base ", __basedir);
    cb(null, __basedir + `\\uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname); //here extension problem
  },
});

var upload = multer({ storage: storage });

module.exports.uploads = {
  uploadx: upload.fields([{ name: "ebook", maxCount: 1 }]),
};
