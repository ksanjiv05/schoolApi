const mongoose = require('mongoose');
const studentSchema = require('../schema/studentSchema');
const dbCon = require('../util/dbConnection')
/***===========panding------------------- */
module.exports.admission = async (req,res) =>{
  try{
    console.log(req.body) 
      const year= new Date().getUTCFullYear();
      const Student = mongoose.model('Student')
      const noOfStudents=(await Student.find({}, "name email", function (err, responce){})).length+1+10000;
      const rollnumber="TSM"+noOfStudents+year;
      req.body.rollnumber=rollnumber;
      req.body.admissionStatus="1";//need update
      // if(checkUser) res.status(403).send("User already exist .");
      // else{
        let student = new studentSchema(req.body);
        await student.save(function(err,data){
          if(err){console.log(err)
            res.status(403).send("student not created .");
          }
          else {
            console.log(data);
            res.status(200).send("student created .");
          }
        });
    
  }catch(err){
    console.log(err)
  }
}

module.exports.admissionStatus=async(req,res)=>{
  console.log(req.body.email)
  const checkStudent=await GetStudentByEmail(req.body.email);
  console.log('students',checkStudent)
  
    if(checkStudent){
        const payload={
          email:checkStudent.email,
          rollnumber:checkStudent.rollnumber,
          admission_Status:checkStudent.admissionStatus
        }
        return res.status(200).json(payload)
    }
    else return res.status(201).json({message:"not aviable"});
}

module.exports.uploadDocument= async(req,res)=>{
  console.log(req.query.email);
  const checkStudent=await GetStudentByEmail(req.query.email);
  console.log('students',checkStudent)
    if(checkStudent){
      const query = {'email':req.query.email};
      console.log(req.files)
      const Student = mongoose.model('Student');
      const profile= req.files.profile[0].filename;
      const markSheet= req.files.markSheet[0].filename;
      const signature= req.files.signature[0].filename;
      console.log(profile,markSheet,signature)
      Student.findOneAndUpdate(query, {profile:profile,marksheet:markSheet,signature:signature,admissionStatus:"2"}, {upsert: true}, function(err, doc) {
        //User.findByIdAndUpdate({_id},{username,name,phone,dob}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        else{ 
          console.log(doc)
          return res.send('Succesfully saved.');}
        });
      
    }
    else{

    }

}

// module.exports.getUsers = (req,res) =>{
//   try {
//     const User = mongoose.model("User");
//     const userExist = User.find({}, "name email", function (err, responce) {
//       if (err) return res.status(422).json({ error: "Error !!!" });
//       console.log(responce);
//       return res.status(200).json({ success: responce });
//     });
//   } catch (error) {
//     res.json({ message: "here some error " });
//   }
// }

// module.exports.getUserByEmail =async (req,res) =>{
//   try {
//     const data = await GetUserByEmail(req.body.email)
//     if(data) res.status(200).json(data)
//     else res.status(404).send("user not exist")
//   } catch (error) {
//     console.log(error)
//     res.json({ message: "here some error" });
//   }
// }

// module.exports.deleteUser = async function (req, res) {
//     try {

//       if (req.body.email == null || req.body.email === "") return res.status(422).json({ error: 'Please provide valid email' });
      
//       const checkUser=await GetUserByEmail(req.body.email);
//       if(!checkUser) res.status(403).send("User not exist .");
//       else{
//         const User = mongoose.model("User");
//         User.remove( { email: req.body.email},function(err){
//           if (err) {
//             console.log(err)
//             res.status(422).send("error")
//           }else res.status(200).send("user deleted")
//         })
//       }
//     } catch (error) {
//       res.json({ message: 'here some error' });
//       // errorLog.error(`Error occured while updating access log : ${error},`);
//     }
//   };


//   module.exports.login= async (req,res)=>{
//     const { email, password } = req.body;
//     try {
//       const User = mongoose.model("User");
//       const checkUser = await User.findOne({ email: email })
//       console.log(checkUser)
//       if (!checkUser)
//         return res.status(400).json({
//           message: "User Not Exist"
//         });
      
//       const isMatch = await bcrypt.compare(password,checkUser.password);
//       if (!isMatch)
//         return res.status(400).json({
//           message: "Incorrect Password !"
//         });

//       const payload = {
//         user: {
//           id: checkUser._id,
//           email:checkUser.email
//         }
//       };

//       jwt.sign(
//         payload,
//         "randomString",
//         {
//           expiresIn: 3600
//         },
//         (err, token) => {
//           if (err) throw err;
//           res.status(200).json({
//             token,
//             message:"successfully Loged in ",
//             // expiresIn:"9h"
//           });
//         }
//       );
//     } catch (e) {
//       console.error(e);
//       res.status(500).json({
//         message: "Server Error"
//       });
//     }
//   }
  

// /**----------------------- */

const GetStudentByEmail= async (email)=>{
  const Student = mongoose.model("Student");
  console.log("----",email)
    return await Student.findOne(
      { email: email },
      "name rollnumber admissionStatus email",
      function (err, responce) {
        if (err) return null; 
        //console.log(responce);
      }
    );
}