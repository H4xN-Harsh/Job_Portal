const Applications = require('../models/applications.models');
const cloudinary = require('../config/cloudinary');
// exports.apply=async(req,res)=>{
//     try{
//         const {jobId} = req.params;
//         const {resume} = req.body;
//         const existingApplication = await Applications.findOne({job:jobId,applicant:req.user._id})
//         if(!existingApplication){
//             const apply = await Applications.create({job:jobId,applicant:req.user._id,resume})
//             res.status(200).json({message:"Applied! ",apply})
//         }else{
//             return res.status(400).json({message:'Already applied! '});
//         }

//     }catch(err){
//         res.status(500).json({message:err.message});
//     }

// }
exports.all=async(req,res)=>{
    try{
        const applications = await Applications.find().populate('job','title companyName').populate('applicant','name email');
        res.status(200).json({message:"all applications are their! ",applications});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.my=async(req,res)=>{
    try{
        
        const applied = await Applications.find({applicant:req.user._id}).populate('job','title companyName location salary');
        res.status(200).json({message:"here all applied job posts",applied});

    }catch(err){
        res.status(500).json({message:err.message});
    }
}
exports.status = async(req,res)=>{
    try{
        const {id}=req.params;
        const {status} = req.body;
        const update = await Applications.findByIdAndUpdate(id,{status},{new:true});
        res.status(200).json({message:"Status up to date! ",update});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

exports.apply = async (req,res)=>{
    try{
        const {jobId} = req.params;
        const existingApplication = await Applications.findOne({
            job:jobId,applicant:req.user._id
        });
        if(existingApplication){
            return res.status(400).json({message:"Already applied!"});
        }
        const fileBuffer = req.file.buffer;
        const uploadResult = await new Promise((resolve,reject)=>{
            cloudinary.uploader.upload_stream(
                {resource_type:'auto',folder:'resumes'},
                (err,result)=>{
                    if(err)reject(err);
                    else resolve(result)
                }
            ).end(fileBuffer);
        });
        const apply = await Applications.create({
            job:jobId,applicant:req.user._id,resume:uploadResult.secure_url
        });
        res.status(200).json({message:"Applied!",apply});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}