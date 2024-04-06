const { body } = require('express-validator')
//categories
exports.AddOrderValidation = [
    body('addressId')
        .notEmpty()
        .withMessage('Select addressId ...'),
    body('paymentMethod')
        .notEmpty()
        .withMessage('Select Payment Method ...'),
    body('userId')
        .notEmpty()
        .withMessage('UserId Required...'),
    body('itemDetails')
        .notEmpty()
        .withMessage('Item Details Required...'),
    body('totalPayment')
        .notEmpty()
        .withMessage('total payment required...')
]
