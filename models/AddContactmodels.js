const mongoose = require('mongoose')
const ContactSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const contact = new mongoose.model('contact', ContactSchema)
module.exports = contact