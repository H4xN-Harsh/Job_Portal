const jwt = require('jsonwebtoken');
const User = require('../models/users.models');
const protect = async (req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select('-password');
        if(!token){
            res.status(401).json({message:"token not provided!"})
        }
        next();
    } catch(err) {
        res.status(401).json({message: "Not authorized"});
    }
}

module.exports = protect;