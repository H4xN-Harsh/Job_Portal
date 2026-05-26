const mongoose = require('mongoose');
const jobSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true,
    },
    position:{
        type:String,
        required:true
    },createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["open","closed"],
        default:"open"
    },
    expiryDate:{
        type:Date,
        required:true
    }

})


const Jobs = mongoose.model("Jobs",jobSchema);
module.exports = Jobs