const User=require('../models/User');
const jwt=require("jsonwebtoken");


const generateToken=(id)=>{
    return jwt.sign({
        id,
    },process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
};

exports.registerUser =async (req,res)=>{

    if(!req.body){
        return res.status(400).json({
            message:"All fields are required",
        })
    }
    
    const {fullName,email,password,profileImageUrl}=req.body;

    if(!fullName || !email || !password){
        return res.status(400).json({
            message:"All fields are required",
        })
    }

    try {
        const exisitingUser=await User.findOne({email});
        
        if(exisitingUser){
            return res.status(400).json({
                message:"email already exists",
            })
        }
        
        
        console.log('profileImageURL=',profileImageUrl);
        
        const user=await User.create({
            fullName,
            email,
            password,
            profileImageUrl
        })

        return res.status(201).json({
           id:user._id,
            user,
            token:generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
        console.log('error while registering user',error);
    }

};


exports.loginUser=async(req,res)=>{

    const {email,password}=req.body

    if(!email || !password){
        return res.status(400).json({
            message:"All fields are required"
        })
    }

    try {
        const user=await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({message:"Invalid credentials"})
        }
        return  res.status(200).json({
            id:user._id,
            user,
            token:generateToken(user._id),
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
        console.log('error while login user',error);
    }
};

exports.getUserInfo=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
        console.log('error while getting  user info',error);
    }
};