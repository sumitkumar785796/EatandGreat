const path = require('path')
const reactPage = async (req,res)=>{
    try {
        res.sendFile(path.resolve(__dirname,'..',"client","build","index.html"))
    } catch (error) {
        console.error(error)
    }
}
module.exports = {reactPage}