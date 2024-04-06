const contact = require('../models/AddContactmodels')
const { validationResult } = require("express-validator");
const { AddcontactValidation } = require('../helpers/AddContactvalidator');
exports.AddContact= async (req, res) => {
    try {
        // Run validation rules
        await Promise.all(AddcontactValidation.map((AddcontactValidation) => AddcontactValidation.run(req)));
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { fname,email,phone,subject,msg } = req.body
        const sendData = await contact.create({
            fname,email,phone,subject,msg
        })
        return res.status(200).json({ message: 'Thank You for contact me!!!', data: sendData })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error', data: error })
    }
}