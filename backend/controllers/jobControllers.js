const Jobs = require('../models/jobs.models');

const Applications = require('../models/applications.models');
exports.create = async(req,res)=>{
    try{
        const{title,description,companyName,location,salary,position,expiryDate} = req.body;
        const job = await Jobs.create({
            title,description,companyName,location,salary,position,expiryDate,
            createdBy:req.user._id
        })
        res.status(201).json({message:"Job created!",
            job
        })
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.all = async(req,res)=>{
    try{
        
        const job = await Jobs.find().populate('createdBy','name email')
        res.status(200).json({message:"all jobs are fetched!",job})
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.getJob=async(req,res)=>{
    try{
        const {id} = req.params;
        const job = await Jobs.findById(id)
        res.status(200).json({message:"job found!",job})
    }catch(err){
        res.status(500).json({message:err.message});
    }
    
}
exports.updateJob = async(req,res)=>{
    try{
        const {id} = req.params;
        const job = await Jobs.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json({message:"job up to date!",job})
    }catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.deleteJob = async(req,res)=>{
    try{
        const {id} = req.params;
        const job = await Jobs.findByIdAndDelete(id)
        await Applications.deleteMany({job:id})
        
        res.status(200).json({message:"job deleted!",job})
    }catch(err){
        res.status(500).json({message:err.message});
    }
}