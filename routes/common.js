const express = require("express");

const router = express.Router();

const { userValidate, emailValidate } = require("../validator/validation");
const {
  createUser,
  getUserByEmail,
  getUsers,
  deleteUser,
  login,
  updateUser,
  changePassword,
} = require("../data/userData");
const { auth } = require("../auth/auth");
//const { binaryFileUpload } = require("../data/binaryFileUpload");

router.post("/user", userValidate, createUser);
router.put("/user", userValidate, updateUser);
router.get("/users", getUsers);
router.get("/userbyemail", emailValidate, getUserByEmail);
router.delete("/userbyemail", emailValidate, deleteUser);
router.post("/login", login);
router.post("/changepassword", auth, userValidate, changePassword);

/**--------------------admission----------------------- */
const x = require("../data/binaryFileUpload");

const {
  admission,
  admissionStatus,
  uploadDocument,
} = require("../data/studentData");

const { addEBook, uploadEbook } = require("../data/librarayData");

router.post("/uploads", x.uploads.uploadx, uploadDocument);
// (req,res)=>{

//   console.log(req.body)
//   res.status(200).json(req.files);
//   //res.send("success",req.files)
// })

router.post("/admission", admission);
router.post("/admissionstatus", admissionStatus);
router.post("/validated", auth, (req, res) => {
  console.log(req.body, req.user);
  res.status(200).json({ message: "success", data: req.user });
});
/**-------------------------library------------------------------------------- */
const staticFile = require("../data/fileUpload");

router.post("/addebook", addEBook);
router.post("/uploadebookfile", staticFile.uploads.uploadx, uploadEbook);
/**--------------------------add course-------------------------------------- */
const { addCourse, getCourse } = require("../data/courseData");

router.post("/addcourse", addCourse);
router.get("/getcourse", getCourse);

/**--------------------- */
router.post(
  "/dataauth",
  (req, res, next) => {
    if (req.body.name) next();
    else res.send("unauth");
  },
  (req, res) => {
    //console.log(req);
    res.send(JSON.stringify(req.body));
  }
);
router.get("/welcomex", auth, (req, res) => {
  res.send("welcome x");
});

/***--------------------------admin ---------------------*/
const { adminLogin } = require("../data/adminData");

router.post("/admin", adminLogin);
// router.post("/applicant", validation.applicant, createApplicant);
module.exports = router;
