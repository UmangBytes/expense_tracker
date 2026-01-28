const jwt=require('jsonwebtoken')
const User=require("../models/User");

exports.protect=async (req,res,next)=>{
    let token=req.headers.authorization?.split(" ")[1];
    console.log("token->",token);
    console.log('type of token->',typeof(token));

    if(!token)
    return res.status(401).json({message:"Not authorized,no token"});

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decoded.id).select('-password')
        console.log('req.user=',req.user);
        next();
    } catch (error) {
        res.status(401).json({message:"Not authorized,token failed,token error"});
    }
}