// var express = require("express");
// var multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, __dirname + `\\uploads`);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname); //here extension problem
//   },
// });

// var upload = multer({ storage: storage });

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
// const cors = require("cors");
// app.use(cors());

app.use(myParser.urlencoded({ extended: true }));
app.use(myParser.json({ extended: true }));
// app.use(cookieParser());
const port = process.env.Port || 3001;

app.use("/api", require("./routes/common.js"));

app.get("/", (req, res) => {
  console.log("welcome sanjiv");
  res.send("Welcome to rest api using nodemon");
});

app.listen(port, () => {
  console.log(`the app listen at port ${port}`);
});
