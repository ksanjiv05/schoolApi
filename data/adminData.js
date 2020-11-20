const mongoose = require("mongoose");
const adminSchema = require("../schema/adminSchema");
const dbCon = require("../util/dbConnection");
module.exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    // let admin = new adminSchema({}).save();
    const Admin = mongoose.model("Admin");
    const adminExist = await Admin.findOne({ email: email });
    console.log(adminExist);
    if (!adminExist)
      return res.status(401).json({ responce: "Admin not exist" });
    else {
      if (adminExist.password == password)
        return res.status(200).json({ responce: email });
      else res.status(401).json({ responce: "Password is wrong" });
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "here some error " });
  }
};
