const multer = require("multer");
require("dotenv").config();
const GridFsStorage = require("multer-gridfs-storage");
const mongoose = require("mongoose");

const conn = mongoose.createConnection(process.env.DATABASE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});
const storage = new GridFsStorage({
  url: process.env.DATABASE_URI,
  file: (req, file) => {
    console.log(req.query);
    return new Promise((resolve, reject) => {
      const filename =
        req.query.email +
        "-" +
        Date.now() +
        "-" +
        file.fieldname +
        "-" +
        file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage: storage });
module.exports.uploads = {
  uploadx: upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "signature", maxCount: 1 },
    { name: "markSheet", maxCount: 1 },
  ]),
};
// module.exports.binaryFileUpload=(req,res,next)=>{
//   console.log("hited")
// upload.fields([
//   { name: 'file1', maxCount: 1 },
//   { name: 'file2', maxCount: 1 }
// ])
// }
