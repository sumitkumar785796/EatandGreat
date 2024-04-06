const mongoose = require('mongoose')
// const Categoires = require('../models/AddCategoriesmodels')
const ProductSchema = new mongoose.Schema({
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoires',
        required: true
    },
    itemname: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    qty: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
const product = new mongoose.model('product', ProductSchema)
module.exports = product