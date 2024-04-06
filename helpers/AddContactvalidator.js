const { body } = require('express-validator')
exports.AddcontactValidation = [
    body('fname')
        .notEmpty()
        .withMessage('Name is required...'),
    body('email')
        .notEmpty()
        .withMessage('Email must be required...'),
    body('phone')
        .notEmpty()
        .withMessage('Phone Number must be required...'),
    body('subject')
        .notEmpty()
        .withMessage('Subject is required...'),
    body('msg')
        .notEmpty()
        .withMessage('Message must be required...'),
]