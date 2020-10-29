const passwordValidate = (password , cpassword)=>{
if(password === cpassword )
  return true;
else
 return {password:"Password do not match !!!"};
}

const mobileValidate = (phone)=>{
  var phoneno = /^\d{10}$/;
  if(phoneno.exec(phone))
    return true;
  else
    return {mobile:"Please enter valid mobile number !!!"};
  }

  module.exports.emailValidate=(req,res,next)=>{
    if(emailCheck(req.body.email)===true){ 
      next()}
    else
    return res.status(403).send({email: "Please enter valid email !!!"});
  }
  const emailCheck = (email)=>{
    var emailrg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(emailrg.exec(email))
      return true
    else
      return {email: "Please enter valid email !!!"};
    }

module.exports.userValidate=async (req,res,next)=>{
  let status=[];
  
  emailCheck(req.body.email)==true?"":status.push(emailCheck(req.body.email));
  mobileValidate(req.body.phone)==true?"":status.push(mobileValidate(req.body.phone));
  passwordValidate(req.body.password,req.body.cpassword)==true?"":status.push(passwordValidate(req.body.password,req.body.cpassword));
  console.log(status)
  if(status.length>0)
    res.status(403).send({error:status});
  else
    next();
}