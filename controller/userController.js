const { createUser }=require('../data/userData')

module.exports.createUser =async (req,res) =>{
  const status = await createUser(req.body)
  console.log("_xxxxxxxxxxxxxx__",status)
if(status)
res.status(200).send("User successfully created .");
else
res.status(403).send("User not created .");
}
module.exports.checkUser = () =>{

}
module.exports.findUsers = () =>{

}

module.exports.findUserByEmail = () =>{

}