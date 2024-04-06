const mongoose = require('mongoose')
const CategoriesSchema = new mongoose.Schema({
    cname:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const Categoires = new mongoose.model('Categoires',CategoriesSchema)
module.exports=Categoires