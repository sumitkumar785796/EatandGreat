const subscribe = require('../models/AddSubscribemodels')
const mailer = require('../helpers/nodemailer');
const { validationResult } = require("express-validator");
const { AddSubscribeValidation } = require('../helpers/AddSubscribevallidator');
exports.AddSubscribe = async (req, res) => {
    try {
        // Run validation rules
        await Promise.all(AddSubscribeValidation.map((AddSubscribeValidation) => AddSubscribeValidation.run(req)));
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email } = req.body
        const sendData = await subscribe.create({
            email
        })
        const msg = `<h3>Dear User</h3><br/>
        <h5>If you have any questions or need assistance </h5><br/><h5> please feel free to reach out to us at sumitkumar785796@gmail.com .</h5><br/>

        <h5>Thank you for subscribing to the Canteen Website.</h5><br/> <h5>We look forward to serving you delicious meals and keeping you informed about our offerings!</h5><br/>
        
        Best regards,<br/>
        
        [Sumit Kumar]<br/>
        Founder in Eat&Greate<br/>
        sumitkumar785796@gmail.com<br/>`;
        mailer.emailMail(email, 'Subscription Confirmation - Eat&Great', msg);
        return res.status(200).json({ message: 'Thank you for subscribing to the my Eat&Great website.We look forward to serving you delicious meals and keeping you informed about our offerings!', data: sendData })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', data: 'error' })
    }
}