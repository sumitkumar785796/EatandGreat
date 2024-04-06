const BlackList = require('../models/Blacklist')
const jwt = require('jsonwebtoken')
const config = process.env
const verfiyToken = async (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers['authorization'] 
    if(!token){
        return res.status(403).json({message:'A token is required for authentication'})
    }
    try {
        const bearer = token.split(' ')
        const bearerToken = bearer[1]
        const blacklisting = await BlackList.findOne({token:bearerToken})
        if(blacklisting){
            return res.status(400).json({message:'This session has expired,please login try again'})
        }
        const decodedData = jwt.verify(bearerToken,config.ACCESS_TOKEN_SECRET)
        req.user = decodedData
    } catch (error) {
        return res.status(401).json({message:'Invalid Token'})
    }
    return next()
}
module.exports=verfiyToken