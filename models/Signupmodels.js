const mongoose = require('mongoose')
const SignupSchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    is_verified:{
        type:Number,
        default:0
    },
    image:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})
const Signup = new mongoose.model('Signup',SignupSchema)
module.exports=Signup