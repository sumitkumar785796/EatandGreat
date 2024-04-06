const mongoose = require('mongoose')
const SubscribeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    }
}, {
    timestamps: true
})
const subscribe = new mongoose.model('subscribe', SubscribeSchema)
module.exports = subscribe