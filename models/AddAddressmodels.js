const mongoose = require('mongoose')
const AddressSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    locality:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
        required: true
    }
},{
    timestamps:true
})
const Address = new mongoose.model('Address',AddressSchema)
module.exports=Address