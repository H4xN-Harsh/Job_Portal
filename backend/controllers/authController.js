
const User = require('../models/users.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.register = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            const hashedPassword = await bcrypt.hash(password,10);
            const user = await User.create({
                name,email,password:hashedPassword,role
            });
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
            const userResponse = user.toObject();
            delete userResponse.password
            res.status(201).json({message:"User registered successfully",
                token,
                user:userResponse
            })
        }else{
            res.status(409).json({message:'User already Exist'});
        }
    }catch(error){
        res.status(500).json({message:error.message});
    }
};
exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
            if(!isPasswordCorrect){
                return res.status(401).json({message:"invalid password"})
            }
            const userResponse = existingUser.toObject();
            delete userResponse.password
            const token = jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:'7d'});
            res.status(200).json({message:"user logged in successfully",token,user:userResponse});
        }else{
            res.status(401).json({message:"user not found"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
};
exports.logout=async(req,res)=>{
    try{

        res.status(200).json({message:"Logged-Out successfully"});
    }catch(err){
        res.status(500).json({message:err});
    }
}