const nodemailer = require('nodemailer')
const transpoter = nodemailer.createTransport({
    host:process.env.SMTP_HOST,
    port:process.env.SMTP_PORT,
    secure:true,
    requireTLS:true,
    auth:{
        user:process.env.SMTP_MAIL,
        pass:process.env.SMTP_PASS
    }
})
const emailMail = async (email,subject,content)=>{
    try {
        var mailOption={
            from:process.env.SMTP_MAIL,
            to:email,
            subject:subject,
            html:content
        }
        transpoter.sendMail(mailOption,(err,info)=>{
            if(err){
                return console.log(err)
            }
            console.log('Send Verification account',info.messageId)
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    emailMail

}