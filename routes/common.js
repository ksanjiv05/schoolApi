const express = require("express");

const router = express.Router();

const { userValidate, emailValidate } = require("../validator/validation");
const { createUser, getUserByEmail, getUsers, deleteUser, login }= require('../data/userData');
const { auth } = require("../auth/auth");

router.post("/user", userValidate,createUser);
router.get("/users",getUsers);
router.get("/userbyemail",emailValidate,getUserByEmail);
router.delete("/userbyemail",emailValidate,deleteUser);
router.post("/login",login)

router.post('/admission',admission)
/**---------------------------------------------------------------- */
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
router.get("/welcomex",auth, (req, res) => {
  
  res.send("welcome x");
});

// router.post("/applicant", validation.applicant, createApplicant);
module.exports = router;


 
