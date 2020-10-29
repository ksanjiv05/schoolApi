const mongoose = require('mongoose')
const dbCon = require('../util/dbConnection')
/***===========panding------------------- */
module.exports.admission = async (req,res) =>{
  try{
    const db = (await dbCon.dbConnection).connection;
    const checkUser=await GetUserByEmail(req.body.email);
    if(checkUser) res.status(403).send("User already exist .");
    else{
      const {username,email,name,phone,password,dob}=req.body;
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      let user = new userSchema({username,email,name,phone,password:hashPassword,dob});

      
      await user.save(function(err,data){
        if(err){console.log(err)
          res.status(403).send("User not created .");
        }
        else {
          console.log(data)
        }
      });
    }
  }catch(err){
    console.log(err)
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

// const GetUserByEmail= async (email)=>{
//   const User = mongoose.model("User");
//     return await User.findOne(
//       { email: email },
//       "name email",
//       function (err, responce) {
//         if (err) return null; 
//         //console.log(responce);
//       }
//     );
// }