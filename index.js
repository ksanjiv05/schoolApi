global.__basedir = __dirname;
require("dotenv").config();
var multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const mongoose = require("mongoose");

/* perfact*/
var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + `\\uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname); //here extension problem
  },
});

const port = process.env.Port || 3001;
const uri = process.env.DATABASE_URI;
const conn = mongoose.createConnection(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//conn.close();////////////
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename =
        file.fieldname + "-" + Date.now() + "-" + file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

var upload = multer({ storage: storage1 });

// var app = express();

// app.post("/profile", upload.single("avatar"), function (req, res, next) {
//   console.log(JSON.stringify(req.body));
//   res.send("recived");
// });

// app.listen(3001, () =>
//   console.log("Express server is running on localhost:3001")
// );

const express = require("express");

const app = express();
const myParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
express.static("uploads");
app.use("/uploads", express.static("uploads"));
app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json({ extended: true }));
// app.use(cookieParser());

app.use("/api", require("./routes/common.js"));

app.get("/", (req, res) => {
  console.log("welcome sanjiv");
  res.send("Welcome to rest api using nodemon");
});

const { sendMail } = require("./util/sendMail");
app.post("/sendMail", (req, res) => {
  console.log(req.body, "-------------------------");
  const msg = {
    to: req.body.email, // Change to your recipient
    from: "kumarsanjiv0005@gmail.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>hiii <a href="google.com">go way</a></strong>`,
  };
  sendMail(msg, res);
});

app.post(
  "/upload",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
  (req, res) => {
    // res.redirect("/");
    console.log(req.files);
    res.send("success");
  }
);

app.get("/image/:filename", (req, res) => {
  // console.log('id', req.params.id)
  const file = gfs
    .find({
      filename: req.params.filename,
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist",
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    });
});

//________________________________________________++++

app.listen(port, () => {
  console.log(`the app listen at port ${port}`);
});
