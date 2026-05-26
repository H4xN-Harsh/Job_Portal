const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['seeker','giver'],
        default:'seeker'
    },
    //seeker fields 
    resume:{
        type:String,
        required:false
    },
    profilePhoto:{
        type:String,
        required:false
    },
    // giver
    companyName:{
        type:String,
        required:false
    },
    companyDescription:{
        type:String,
        required:false
    },
    designation:{
        type:String,
        required:false
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema);
module.exports = User;