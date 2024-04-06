const jwt = require('jsonwebtoken')
const verfiyToken = async (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization'] 
    if(!token){
        return res.status(403).json({message:'A token is required for authentication'})
    }
    try {
        const bearer = token.split(' ')
        const bearerToken = bearer[1]
        const decodedData = jwt.verify(bearerToken,process.env.ACCESS_TOKEN_SECRET)
        req.user = decodedData
    } catch (error) {
        return res.status(401).json({message:'Invalid Token'})
    }
    return next()
}
module.exports=verfiyToken