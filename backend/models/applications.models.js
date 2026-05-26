const mongoose = require('mongoose');
const applicationSchema = mongoose.Schema({
    jobs:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jobs"
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    resume:{
        type:String,
        required:true
    },status:{
        type:String,
        enum:['pending','reviewed','rejected'],
        default:'pending'
    }
},{timestamps:true})

const Applications = mongoose.model("Applications",applicationSchema);
module.exports = Applications;