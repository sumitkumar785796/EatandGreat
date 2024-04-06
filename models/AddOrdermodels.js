const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
        required: true
    },
    itemDetails: [],
    status:{
        type:String,
        default:0
    },
    totalPayment:{
        type:Number,
        required:true
    }
}, 
{
    timestamps: true
})
const order = new mongoose.model('order', OrderSchema)
module.exports = order