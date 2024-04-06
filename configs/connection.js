const mongoose = require('mongoose')
const URL = process.env.MONGODB_URI
const connDB = async () =>{
    try {
        await mongoose.connect(URL)
        console.log('Connected successfully...')
    } catch (error) {
        console.log(error)
    }
}
module.exports=connDB