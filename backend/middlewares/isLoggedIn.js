const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports=async function (req,res,next) {
if(!req.cookies.token){
res.json({success:false,message:"cookie not found"});
} 
try{
    let decoded = jwt.verify(req.cookies.token,process.env.JWT_KEY);
    let user = userModel
    .findOne({email:decoded.email})
    .select("-password");
    req.user = user;
    next();
} catch(err){
res.send({success:false,message:"token not found"});
}  
}