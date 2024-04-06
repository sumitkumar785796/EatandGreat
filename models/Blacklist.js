const mongoose = require('mongoose')
const BlacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const BlackList = new mongoose.model('BlackList',BlacklistSchema)
module.exports=BlackList